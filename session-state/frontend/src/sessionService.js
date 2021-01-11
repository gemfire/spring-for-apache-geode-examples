/*
 * Copyright 2019 - 2021 VMware, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import axios from 'axios';

const instance = axios.create();

const addNote = async (note) => {
    await instance.post('/addSessionNote', note,{
        headers: { 'Content-Type': 'text/plain' }
    });
};

const getNotes = async () => {
    const response = await instance.get('/getSessionNotes');
    return response.data;
};

const destroySession = async () => {
    await instance.post('/invalidateSession');
};

const sessionServiceMethods = {
    addNote,
    getNotes,
    destroySession,
};

export default sessionServiceMethods;