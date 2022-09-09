import 'whatwg-fetch';
import 'setimmediate';

// PARA PODER UTILIZAR LAS VARIABLES DE ENTORNO
// EN TESTING!
require('dotenv').config({
    path: '.env.test'
});

jest.mock('./src/helpers/getEnvironments', () => ({
    getEnvironments: () => ({ ...process.env })
}));