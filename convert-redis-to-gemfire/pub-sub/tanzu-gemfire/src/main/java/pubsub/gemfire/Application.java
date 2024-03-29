/*
 * Copyright 2019 - 2021 VMware, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

package pubsub.gemfire;

import org.apache.geode.cache.CacheListener;
import org.apache.geode.cache.EntryEvent;
import org.apache.geode.cache.util.CacheListenerAdapter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.data.gemfire.client.ClientRegionFactoryBean;
import org.springframework.data.gemfire.config.annotation.EnableCachingDefinedRegions;
import org.springframework.data.gemfire.config.annotation.RegionConfigurer;
import org.springframework.geode.config.annotation.EnableClusterAware;

import java.util.concurrent.CountDownLatch;

@SpringBootApplication
@EnableCachingDefinedRegions
@EnableClusterAware
public class Application {
    private static final Logger LOGGER = LoggerFactory.getLogger(Application.class);

    @Bean
    CacheListenerAdapter<String, String> chatRegionSubscriber(CountDownLatch countDownLatch) {
        return new CacheListenerAdapter<String, String>() {
            public void afterCreate(EntryEvent<String, String> event) {
                LOGGER.info("Subscriber received <" + event.getNewValue() + ">");
                countDownLatch.countDown();
            }
        };
    }

    @Bean
    RegionConfigurer regionConfigurer(CacheListener<String, String> chatRegionSubscriber) {
        return new RegionConfigurer() {
            @Override
            public void configure(String regionName, ClientRegionFactoryBean<?, ?> regionFactory) {
                if (regionName.equals("chat")) {
                    LOGGER.info("Attaching cache listener to region: " + regionName);
                    regionFactory.setCacheListeners(
                            new CacheListener[]{chatRegionSubscriber});
                }
            }
        };
    }

    @Bean
    CountDownLatch countDownLatch() {
        return new CountDownLatch(1);
    }

    public static void main(String[] args) throws InterruptedException {
        ApplicationContext applicationContext = SpringApplication.run(Application.class, args);

        CountDownLatch countDownLatch = applicationContext.getBean(CountDownLatch.class);
        MessageSender messageSender = applicationContext.getBean(MessageSender.class);

        LOGGER.info("Sending message...");
        messageSender.sendMessage("Hello from GemFire!");

        countDownLatch.await();
    }
}
