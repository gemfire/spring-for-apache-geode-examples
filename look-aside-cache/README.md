<!--
Copyright 2019 - 2021 VMware, Inc.
SPDX-License-Identifier: Apache-2.0
-->

# Look-aside Cache Pattern Example

This repo contains an example application demonstrating the use of Tanzu GemFire as a look-aside cache and can be used with the [Basic Cache Guide](https://tanzugemfire.dev/spring-boot-for-apache-geode/guides/a-basic-cache/).

The application uses [Spring Boot for Pivotal Gemfire](https://docs.spring.io/autorepo/docs/spring-boot-data-geode-build/current/reference/html5/) to cache data from the Bikewise.org public REST API. Look-aside caching is enabled with just a few annotations. When serving cached data, the application response time is dramatically improved.
