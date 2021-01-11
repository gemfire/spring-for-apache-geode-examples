/*
Copyright 2019 - 2021 VMware, Inc.
SPDX-License-Identifier: Apache-2.0
*/


package com.vmware.tanzu.gemfire.lookasidecache;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LookAsideCacheApplication {
    public static void main(String[] args) {
        SpringApplication.run(LookAsideCacheApplication.class, args);
    }
}