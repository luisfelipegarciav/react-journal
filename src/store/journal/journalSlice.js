import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, { payload }) => {
            state.notes.push(payload);
            state.isSaving = false;
        },
        setActiveNote: (state, { payload }) => {
            state.active = payload;
            state.messageSaved = '';
        },
        setNotes: (state, { payload }) => {
            state.notes = [...payload];
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, {payload}) => {
            state.isSaving = false;

            state.notes = state.notes.map(note => {
                if (note.id === payload.id) {
                    return payload;
                }
                return note;
            });

            state.messageSaved = `${payload.title}, actualizado exitosamente`;
        },
        setPhotosToActiveNote: (state, { payload }) => {
            state.isSaving = false;
            state.active.imageUrls = [...state.active.imageUrls, ...payload];
        },
        clearNotesLogout: (state ) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: (state, { payload }) => {
            state.isSaving = false;
            state.notes = state.notes.filter(note => note.id !== payload);
            state.active = null;
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
} = journalSlice.actions;