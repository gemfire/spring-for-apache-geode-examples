/*
 * Copyright 2019 - 2021 VMware, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

module.exports = {
    "transform": {
        "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest"
    },
    "moduleNameMapper": {
        "\\.(css|jpg|png|svg)$": "<rootDir>/test/__mocks__/styleMock.js"
    },
    "testMatch": ["<rootDir>/test/**/?(*.)+(spec|test).js?(x)" ],
    "setupFilesAfterEnv": ["<rootDir>/test/config/setUpTests.js"],
    "clearMocks": true
};