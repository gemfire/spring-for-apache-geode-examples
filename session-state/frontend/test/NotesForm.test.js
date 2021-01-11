/*
 * Copyright 2019 - 2021 VMware, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {mount} from 'enzyme';
import NotesForm from "../src/components/NotesForm";
import sessionService from "../src/sessionService";

describe("NotesForm", () => {
    let subject;
    const mockGetNotes = jest.fn();

    beforeEach(() => {
        subject = mount(
            <NotesForm getNotes={mockGetNotes} />
        );
    });

    it('should capture note correctly when input text changes', () => {
        expect(subject.state().note).toEqual('');

        const noteInput = subject.find('[data-qa="NotesForm__note-input"]');
        noteInput.instance().value = 'New note!';
        noteInput.simulate('change');

        expect(subject.state().note).toEqual('New note!');
    });

    it('should add inputted note when form is submitted', () => {

        const addNoteSpy = jest.spyOn(sessionService, 'addNote');
        const noteInput = subject.find('[data-qa="NotesForm__note-input"]');

        noteInput.instance().value = 'New note!';
        noteInput.simulate('change');
        subject.find('[data-qa="NotesForm__submit-button"]').simulate('submit');

        expect(addNoteSpy).toHaveBeenCalledTimes(1);
        expect(addNoteSpy).toHaveBeenCalledWith('New note!');
    });
});