/*
 * Copyright 2019 - 2021 VMware, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

package pubsub.gemfire;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

@Component
public class MessageSender {
    @Cacheable("chat")
    public String sendMessage(String message) {
        return message;
    }
}
