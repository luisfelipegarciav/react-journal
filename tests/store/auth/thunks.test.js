import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {

    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('debe de invocar el checkingAuthentication', async () => {

        await checkingAuthentication()(dispatch);

        // expect(dispatch).toHaveBeenCalledWith({"payload": undefined, "type": "auth/checkingCredentials"});
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());

    });

    test('startGoogleSignIn debe de llamar checkingCredentials y login', async () => {

        const loginData = {
            ok: true,
            ...demoUser
        };

        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));

    });

    test('debe de llamar checkingCredentials y logout', async () => {

        const loginData = {
            ok: false,
            errorMessage: 'error'
        };

        await signInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({errorMessage: loginData.errorMessage}));

    });

    test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials, registerUserWithEmailPassword y login', async () => {

        const loginData = {
            ok: true,
            ...demoUser
        };

        const userToCreate = {
            email: demoUser.email,
            password: '123',
            displayName: demoUser.displayName
        };

        await registerUserWithEmailPassword.mockResolvedValue(loginData);

        await startCreatingUserWithEmailPassword(userToCreate)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(demoUser));

    });

    test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials, registerUserWithEmailPassword y logout', async () => {

        const loginData = {
            ok: false,
            errorMessage: 'error'
        };

        const userToCreate = {
            email: demoUser.email,
            password: '123',
            displayName: demoUser.displayName
        };

        await registerUserWithEmailPassword.mockResolvedValue(loginData);

        await startCreatingUserWithEmailPassword(userToCreate)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({errorMessage: loginData.errorMessage}));

    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials, loginWithEmailPassword y login', async () => {

        const loginData = {
            ok: true,
            ...demoUser
        };

        const formData = {
            email: demoUser.email,
            password: '123'
        };

        await loginWithEmailPassword.mockResolvedValue(loginData);

        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(demoUser));

    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials, loginWithEmailPassword y logout', async () => {

        const loginData = {
            ok: false,
            errorMessage: 'error'
        };

        const formData = {
            email: demoUser.email,
            password: '123'
        };

        await loginWithEmailPassword.mockResolvedValue(loginData);

        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({errorMessage: loginData.errorMessage}));

    });

    test('startLogout', async () => {

        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());

    });

})