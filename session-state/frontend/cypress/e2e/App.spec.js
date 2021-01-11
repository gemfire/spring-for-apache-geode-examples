/*
Copyright 2019 - 2021 VMware, Inc.
SPDX-License-Identifier: Apache-2.0
*/


context('App', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    describe('When user adds a note ', () => {
        before(() => {
            cy.server();
            cy.route({
                method: 'POST',
                url: '/addSessionNote',
            }).as('addSessionNoteRouteAlias');
            cy.route({
                method: 'POST',
                url: '/invalidateSession',
            }).as('invalidateSessionRouteAlias');
        });

        it('should display note in note list', () => {
            cy.get('[data-qa="NotesForm__note-input"]').type("a test note");
            cy.get('[data-qa="NotesForm__submit-button"]').click();
            cy.wait('@addSessionNoteRouteAlias');

            cy.get('[data-qa="NotesDisplay__note"]')
                .should((notes) => {
                    expect(notes).to.have.length(1);
                    expect(notes[0]).to.contain("a test note")
                });
        });

        after(() => {
            cy.get('[data-qa="NotesDisplay__destroy-session-button"]').click();
            cy.wait('@invalidateSessionRouteAlias');
        });
    });


    describe('When page is reloaded', () => {
        before(() => {
            cy.server();
            cy.route({
                method: 'POST',
                url: '/addSessionNote',
            }).as('addSessionNoteRouteAlias');
            cy.route({
                method: 'POST',
                url: '/invalidateSession',
            }).as('invalidateSessionRouteAlias');
            cy.get('[data-qa="NotesForm__note-input"]').type("note to be saved in the session");
            cy.get('[data-qa="NotesForm__submit-button"]').click();
            cy.wait('@addSessionNoteRouteAlias');
        });
        
        it('should display all notes previously added in session', () => {
            cy.reload();

            cy.get('[data-qa="NotesDisplay__note"]')
                .should((notes) => {
                    expect(notes).to.have.length(1);
                    expect(notes[0]).to.contain("note to be saved in the session")
                });
        });

        after(() => {
            cy.get('[data-qa="NotesDisplay__destroy-session-button"]').click();
            cy.wait('@invalidateSessionRouteAlias');
        });
    });

    describe('When user destroys the session', () => {
        before(() => {
            cy.server();
            cy.route({
                method: 'POST',
                url: '/addSessionNote',
            }).as('addSessionNoteRouteAlias');
            cy.route({
                method: 'POST',
                url: '/invalidateSession',
            }).as('invalidateSessionRouteAlias');
            cy.get('[data-qa="NotesForm__note-input"]').type("note to be destroyed");
            cy.get('[data-qa="NotesForm__submit-button"]').click();
            cy.wait('@addSessionNoteRouteAlias');
        });

        it('should no longer display any notes', () => {
            cy.get('[data-qa="NotesDisplay__note"]')
                .should((notes) => {
                    expect(notes).to.have.length(1);
                });

            cy.get('[data-qa="NotesDisplay__destroy-session-button"]').click();
            cy.wait('@invalidateSessionRouteAlias');

            cy.get('[data-qa="NotesDisplay__note"]')
                .should((notes) => {
                    expect(notes).to.have.length(0);
                });
        });
    });
});

