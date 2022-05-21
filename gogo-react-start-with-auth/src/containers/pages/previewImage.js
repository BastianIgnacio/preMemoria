/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import React, { useState } from 'react';

const PreviewImage = ({ file }) => {

    const [preview, setPreview] = useState(null);
    const reader = new FileReader();
    const { type } = file;
    reader.readAsDataURL(file);
    reader.onload = () => {
        setPreview(reader.result);
    };

    return (
        (type === 'image/jpeg' || type === 'image/png') ? (<div>
            <img src={preview} alt="preview" width="250px" height="250px" />
        </div>) : (<p className="m-1 text-muted text-medium font-weight-bold">
            Imposible de visualizar, ingresar una imagen!
        </p>)
    );
};
export default PreviewImage;
