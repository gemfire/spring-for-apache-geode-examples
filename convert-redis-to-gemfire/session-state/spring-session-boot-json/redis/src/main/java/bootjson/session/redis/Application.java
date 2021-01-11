/*
Copyright 2019 - 2021 VMware, Inc.
SPDX-License-Identifier: Apache-2.0
*/

package bootjson.session.redis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
