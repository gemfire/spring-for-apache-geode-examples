/*
 * Copyright 2019 - 2021 VMware, Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import propTypes from "prop-types";
import sessionService from "../sessionService";

const NotesDisplay = (props) => {
    const notes = Array.from(props.notes).map((note, index) => {
        return <p key={`note${index}`} data-qa="NotesDisplay__note">{note}</p>});

    const destroySession = async () => {
        await sessionService.destroySession();
        await props.getNotes();
    };

    if (notes.length > 0) {
        return (
                <div>
                    <div className="NotesDisplay__header-wrapper">
                        <h2 data-qa="NotesDisplay__header">Notes</h2>
                        <button className="NotesDisplay__destroy-session-button"
                                data-qa="NotesDisplay__destroy-session-button"
                                onClick={destroySession}>
                            DESTROY SESSION
                        </button>
                    </div>
                    {notes}
                </div>
            );
    }

    return null;
};

export default NotesDisplay;

NotesDisplay.propTypes = {
    notes: propTypes.array,
    getNotes: propTypes.func,
};