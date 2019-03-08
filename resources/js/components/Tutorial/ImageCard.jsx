import React from 'react';

const ImageCard = (props) => (
    <img src={props.src ? props.src : ''} className="img-fluid card" />
);

export default ImageCard;
