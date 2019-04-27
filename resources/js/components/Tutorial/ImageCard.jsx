import React from 'react';
import { PropTypes } from 'prop-types';

const ImageCard = props => <img src={props.src ? props.src : ''} className="img-fluid card" />;

ImageCard.propTypes = {
    src: PropTypes.string,
};

export default ImageCard;
