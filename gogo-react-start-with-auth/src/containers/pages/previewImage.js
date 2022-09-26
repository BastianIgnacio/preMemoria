/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import React from 'react';

const PreviewImage = ({ base64 }) => {
    console.log(base64);
    return (
        (<img src={base64} alt="preview" width="250px" height="250px" />)
    );
};
export default PreviewImage;
