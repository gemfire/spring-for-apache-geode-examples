/*
Copyright 2019 - 2021 VMware, Inc.
SPDX-License-Identifier: Apache-2.0
*/

import React, {Component} from 'react';
import NotesForm from "./NotesForm";
import sessionService from "../sessionService";
import NotesDisplay from "./NotesDisplay";
import '../styles/main.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {notes: []};
    }

    getNotes = async () => {
        const notes = await sessionService.getNotes();
        this.setState({notes})
    };

    async componentDidMount() {
        await this.getNotes();
    }

    render() {
        return (
            <div className="App" data-qa="App">
                <h1>Session State Caching</h1>
                <NotesForm getNotes={this.getNotes}/>
                <NotesDisplay getNotes={this.getNotes} notes={this.state.notes}/>
            </div>
        );
    }
}

export default App;
