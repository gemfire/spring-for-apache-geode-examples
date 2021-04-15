<!--
Copyright 2019 - 2021 VMware, Inc.
SPDX-License-Identifier: Apache-2.0
-->

# Cache-aside Pattern Example

This repo contains an example application demonstrating the use of Tanzu GemFire as a cache-aside cache and can be used with the [Cache-Aside Pattern Guide](https://tanzu.vmware.com/developer/data/tanzu-gemfire/guides/spring-for-apache-geode/cache-aside-pattern-sbdg).

The application uses [Spring Boot for Apache Geode](https://docs.spring.io/autorepo/docs/spring-boot-data-geode-build/current/reference/html5/) to cache data from the Bikewise.org public REST API. Look-aside caching is enabled with just a few annotations. When serving cached data, the application response time is dramatically improved.
