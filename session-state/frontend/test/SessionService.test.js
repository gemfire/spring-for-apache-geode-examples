/*
 * Copyright 2019 - 2021 VMware, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import sessionService from "../src/sessionService";
import mockAxios from 'axios'


describe("sessionService", () => {
    it('should call addSessionNote endpoint when addNote is called', async () => {
        mockAxios.post.mockImplementationOnce(() =>
            Promise.resolve({ data: {} }),
        );
        await sessionService.addNote("New note!");

        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith("/addSessionNote", 'New note!', {"headers": {"Content-Type": "text/plain"}});
    });

    it('should call getSessionNotes endpoint when getNotes is called', async () => {
        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: ["One note", "Two note"] }),
        );
        await sessionService.getNotes();
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        expect(mockAxios.get).toHaveBeenCalledWith("/getSessionNotes");
    });

    it('should call invalidateSession endpoint when destroySession is called', async () => {
        mockAxios.post.mockImplementationOnce(() =>
            Promise.resolve({ data: {} }),
        );
        await sessionService.destroySession();

        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        expect(mockAxios.post).toHaveBeenCalledWith("/invalidateSession");
    });
});