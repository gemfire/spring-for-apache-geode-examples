/*
 * Copyright 2019 -  2021. VMware, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

package com.vmware.tanzu.gemfire.helloworld;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @Autowired
    HelloWorldService helloWorldService;

    @RequestMapping(value="/", produces = "text/html")
    public String getHelloValue() {

        String key = "hello";

        long timeBeforeQuery = System.currentTimeMillis();

        String helloValue = helloWorldService.getHelloValue(key);

        long timeElapsed = System.currentTimeMillis() - timeBeforeQuery;

        return "<html><body>"
                + "<i>key:</i> " + key + "<br>"
                + "<i>value:</i> " + helloValue + "<br>"
                + "<i>time to look up:</i> <b>" + timeElapsed + "ms</b>"
                + "</body></html>";
    }
}
