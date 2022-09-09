export const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
}

export const newNote = {
    title: '',
    body: '',
    date: new Date().getTime(),
    imageUrls: []
}