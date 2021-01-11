/*
 * Copyright 2019 - 2021 VMware, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {Component} from 'react';
import sessionService from "../sessionService";
import propTypes from "prop-types";

class NotesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {note: ''};
    }

    addNote = async (event) => {
        event.preventDefault();
        await sessionService.addNote(this.state.note.valueOf());
        this.setState({note: ''});
        await this.props.getNotes();

    };

    onNoteInputChange = (event) => {
        this.setState({note: event.target.value});
    };

    render() {
        return (
            <form className="NotesForm" onSubmit={this.addNote}>
                <label className="NotesForm__note-label">Enter your note:</label>
                <input
                    className="NotesForm__note-input"
                    data-qa="NotesForm__note-input"
                    type='text'
                    value={this.state.note}
                    onChange={this.onNoteInputChange}
                />
                <button
                    className="NotesForm__submit-button"
                    data-qa="NotesForm__submit-button"
                    type="submit">Add</button>
            </form>
        );
    }
}

export default NotesForm;

NotesForm.propTypes = {
    getNotes: propTypes.func
};