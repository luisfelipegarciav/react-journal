import { addNewEmptyNote, journalSlice, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice"
import { initialState, newNote } from "../../fixtures/journalFixtures"

describe('Pruebas en JournalSlice', () => {
    test('debe cargar el estado inicial', () => {

        const state = journalSlice.reducer(initialState, {});

        expect(journalSlice.name).toBe('journal');
        expect(state).toEqual(initialState);

    });

    test('debe isSaving ser true ', () => {

        const state = journalSlice.reducer(initialState, savingNewNote());

        expect(state.isSaving).toBeTruthy();

    });

    test('debe agregar una nota vacia ', () => {

        const state = journalSlice.reducer(initialState, addNewEmptyNote(newNote));

        expect(state.notes.length).toBe(1);
        expect(state.notes[0].title).toBe('');
        expect(state.notes[0].body).toBe('');
        expect(state.notes[0].imageUrls.length).toBe(0);
        expect(state.isSaving).toBeFalsy();

    });

    test.only('debe asignar la nota activa ', () => {

        const state = journalSlice.reducer(initialState, setActiveNote(newNote));

        expect(state.active).toEqual(newNote);
        expect(state.messageSaved).toBe('');

    });
})