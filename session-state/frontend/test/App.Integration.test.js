/*
 * Copyright 2019 - 2021 VMware, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {mount} from 'enzyme';
import sessionService from "../src/sessionService";
import App from "../src/components/App";

describe("App Integration", () => {
    let subject;

    it('should get and update notes after mounting', async () => {
        const getNotesPromise = Promise.resolve(["One note", "Two note"]);
        const getNotesSpy = jest.spyOn(sessionService, 'getNotes').mockImplementation(() => getNotesPromise);

        subject = mount(
            <App/>
        );

        await getNotesPromise;
        subject.update();
        const notes = subject.find('[data-qa="NotesDisplay__note"]');

        expect(notes.length).toEqual(2);
        expect(notes.at(1).text()).toEqual("Two note");
        expect(getNotesSpy).toHaveBeenCalledTimes(1);
    });

    describe('when destroy session button clicked', function () {

        let destroySessionSpy;
        let destroySessionPromise;
        let getNotesSpyPromiseWithNotes;
        let getNotesSpyPromiseWithoutNotes;
        let getNotesSpy;

        beforeEach(async () => {
            destroySessionSpy = jest.spyOn(sessionService, 'destroySession');
            destroySessionPromise = Promise.resolve({});
            getNotesSpyPromiseWithNotes = Promise.resolve(["One note", "Two note"]);
            getNotesSpyPromiseWithoutNotes = Promise.resolve([]);

            getNotesSpy = jest.spyOn(sessionService, 'getNotes');

            destroySessionSpy.mockImplementationOnce(() => destroySessionPromise);

            getNotesSpy
                .mockImplementationOnce(() => getNotesSpyPromiseWithNotes)
                .mockImplementationOnce(() => getNotesSpyPromiseWithoutNotes);

            subject = mount(
                <App/>
            );

            await getNotesSpyPromiseWithNotes;
            subject.update();
        });

        it('should clear session when "Destroy Session" button is clicked', async () => {
            subject.find('[data-qa="NotesDisplay__destroy-session-button"]').simulate('click');

            await destroySessionPromise;
            await getNotesSpyPromiseWithoutNotes;
            subject.update();

            expect(destroySessionSpy).toHaveBeenCalledTimes(1);
        });

        it('should delete notes when "Destroy Session" button is clicked', async () => {

            let notes = subject.find('[data-qa="NotesDisplay__note"]');

            expect(notes.length).toEqual(2);
            expect(getNotesSpy).toHaveBeenCalledTimes(1);

            subject.find('[data-qa="NotesDisplay__destroy-session-button"]').simulate('click');

            await destroySessionPromise;
            await getNotesSpyPromiseWithoutNotes;
            subject.update();

            notes = subject.find('[data-qa="NotesDisplay__note"]');

            expect(notes.length).toEqual(0);
            expect(getNotesSpy).toHaveBeenCalledTimes(2);
        });
    });
});