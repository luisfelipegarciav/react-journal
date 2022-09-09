import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas en authSlice', () => {

    test('debe de regresar el estado inicial y llamarse "auth"', () => {

        const state = authSlice.reducer(initialState, {});

        expect(authSlice.name).toBe('auth');
        expect(state).toEqual(initialState);

    });

    test('debe de realizar la autenticacion', () => {
        
        const state = authSlice.reducer(initialState, login(demoUser));

        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: undefined
        });

    });

    test('debe de realizar el logout sin argumentos', () => {
        
        const state = authSlice.reducer(initialState, logout());

        expect(state).toEqual({
            status : 'not-authenticated',
            uid : null,
            email : null,
            displayName : null,
            photoURL : null,
            errorMessage : null,
        });

    });

    test('debe de realizar el logout y mostrar un mensaje', () => {
        
        const payload = {errorMessage: 'this is esparta'};
        const state = authSlice.reducer(initialState, logout(payload));

        expect(state).toEqual({
            status : 'not-authenticated',
            uid : null,
            email : null,
            displayName : null,
            photoURL : null,
            errorMessage : payload.errorMessage,
        });

    });

    test('debe de cambiar el estado a "checking"', () => {
        
        const state = authSlice.reducer(initialState, checkingCredentials());

        expect(state.status).toBe('checking');

    });

});