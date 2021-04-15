/*
Copyright 2019 - 2021 VMware, Inc.
SPDX-License-Identifier: Apache-2.0
*/


package com.vmware.tanzu.gemfire.cacheaside;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CacheAsideApplication {
    public static void main(String[] args) {
        SpringApplication.run(CacheAsideApplication.class, args);
    }
}