import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote());

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));
    }
}

export const startSavingNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: currentNote } = getState().journal;

        const noteToFireStore = { ...currentNote };
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${currentNote.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true });

        dispatch(updateNote(currentNote));
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        const photosUrls = await Promise.all(fileUploadPromises);

        dispatch(setPhotosToActiveNote(photosUrls));

    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: currentNote } = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${currentNote.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(currentNote.id));

    }
}
