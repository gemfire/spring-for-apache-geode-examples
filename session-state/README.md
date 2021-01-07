<!-- Copyright (C) 2019-Present Pivotal Software, Inc. All rights reserved.

This program and the accompanying materials are made available under the terms of the under the Apache License, Version
2.0 (the "License”); you may not use this file except in compliance with the License. You may obtain a copy of the
License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific
language governing permissions and limitations under the License. -->
 
# Session State Code Example

This example demonstrates the use of Tanzu GemFire for session state caching and can be used with the [Session State Caching Guide](https://tanzugemfire.dev/spring-boot-for-apache-geode/guides/session-state-caching/).

The application uses [Spring Boot for Pivotal Gemfire](https://docs.spring.io/autorepo/docs/spring-boot-data-geode-build/current/reference/html5/) to cache data from the Bikewise.org public REST API. Look-aside caching is enabled with just a few annotations. When serving cached data, the application response time is dramatically improved.


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

