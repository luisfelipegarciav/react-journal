export const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const authenticatedState = {
    status: 'authenticated',
    uid: 'abc',
    email: 'mail@fake.com',
    displayName: 'Demo user',
    photoURL: 'https://photo.jpg',
    errorMessage: null
}

export const notAuthenticatedState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const demoUser = {
    uid: 'abc',
    email: 'mail@fake.com',
    displayName: 'Demo user',
    photoURL: 'https://photo.jpg',
}