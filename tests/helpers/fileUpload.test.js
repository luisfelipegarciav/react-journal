import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    api_key: '997319592663621',
    api_secret: 'LQXlxBCD93T08XEia-taDJC_whE',
    cloud_name: 'dd5cpy5ur',
    secure: true,
});

describe('Pruebas en fileUpload', () => {
    test('debe de subir el archivo correctamente a cloudinary', async () => {

        const imageUrl = 'https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.19.5/mercadolibre/logo__large_plus.png';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const fileName = `${new Date().getTime()}.png`;
        const file = new File([blob], fileName);

        const url = await fileUpload(file);

        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].split('.')[0];

        const cloudResp = await cloudinary.api.delete_resources([`journal/${imageId}`], {
            resource_type : 'image'
        });

        // console.log({ cloudResp });

    });

    test('debe de retornar null', async () => {

        const fileName = `${new Date().getTime()}.png`;
        const file = new File([], fileName);

        const url = await fileUpload(file);

        expect(url).toBe(null);

    });
})