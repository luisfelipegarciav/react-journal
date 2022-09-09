export const fileUpload = async (file) => {

    if (!file) return null; //throw new Error('File missing');

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dd5cpy5ur/image/upload';

    const formData = new FormData();

    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {

        const resp = await fetch(cloudUrl, {
            method:'POST',
            body: formData
        });

        if (!resp.ok) throw new Error('Something when wrong!!');

        const cloudResp = await resp.json();

        return cloudResp.secure_url
        
    } catch (error) {
        // throw error;
        return null;
    }
}