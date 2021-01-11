/*
 * Copyright 2019 - 2021 VMware, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {mount} from 'enzyme';
import NotesDisplay from "../src/components/NotesDisplay";
import sessionService from "../src/sessionService";

describe("NotesDisplay", () => {
    let subject;

    beforeEach(() => {
        subject = mount(
            <NotesDisplay notes={["One note", "Two note", "Red note", "Blue note"]} getNotes={() => {}}/>
        );
    });

    it('should not display any notes or notes header if no notes exist', () => {
        subject.setProps({notes: []});

        expect(subject.find('[data-qa="NotesDisplay__header"]').exists()).toBeFalsy();
    });

    it('should correctly display notes if notes exist', () => {
        const notes = subject.find('[data-qa="NotesDisplay__note"]');

        expect(notes.length).toEqual(4);
        expect(notes.at(0).text()).toEqual("One note");
        expect(subject.find('[data-qa="NotesDisplay__header"]').exists()).toBeTruthy();
    });

    it('should destroy session when "Destroy Session" button clicked', () => {
        const destroySessionSpy = jest.spyOn(sessionService, 'destroySession');

        subject.find('[data-qa="NotesDisplay__destroy-session-button"]').simulate('click');

        expect(destroySessionSpy).toHaveBeenCalledTimes(1);
    });
});
