/*
 * Copyright 2019 - 2021. VMware, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

package com.vmware.tanzu.gemfire.helloworld;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.gemfire.config.annotation.EnableCachingDefinedRegions;
import org.springframework.geode.config.annotation.EnableClusterAware;

@SpringBootApplication
@EnableCachingDefinedRegions
@EnableClusterAware
public class HelloWorldApplication {


	public static void main(String[] args) {
		SpringApplication.run(HelloWorldApplication.class, args);
	}
}
