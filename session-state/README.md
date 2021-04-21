<!--
Copyright 2019 - 2021 VMware, Inc.
SPDX-License-Identifier: Apache-2.0
-->
 
# Session State Code Example

This example demonstrates the use of Tanzu GemFire for session state caching and can be used with the [Session State Caching Guide](https://tanzu.vmware.com/developer/data/tanzu-gemfire/guides/session-state-cache-sbdg/).

The application uses [Spring Boot for Apache Geode](https://docs.spring.io/autorepo/docs/spring-boot-data-geode-build/current/reference/html5/).


## When should I use a session state cache?

Session state caching is useful for storing data associated with an HTTP session.  Storing this data in a cache allows
it to  be retrieved quickly and persisted across logins. Some examples where this might be useful include:

- Shopping cart entries
- User preferences (name, site theme, etc.) 
- Single Sign On (SSO) credentials
- Site Navigation History
    
## How does session state caching work?

When a user connects to a website that utilizes sessions, an HTTP session is created.

In our example the Spring Session library takes care of managing the user session.  When a user connects, a unique ID
for the session is generated and stored as a cookie in the user’s browser. On subsequent requests, the cookie is sent
to the server, identifying the session.	

The session UUID is used as a key in a data store holding information associated with the session (see examples of
session data above.) The data store can be a traditional database,but this can lead to performance issues when there is
a large volume of users, or user data, or both. A cache can improve performance in these cases.

