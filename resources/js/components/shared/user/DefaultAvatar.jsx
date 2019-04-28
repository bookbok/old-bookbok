import React from 'react';
import { PropTypes } from 'prop-types';

const DefaultAvatar = props => (
    <img src="/images/book-fff.svg" className={props.className ? props.className : ''} />
);

DefaultAvatar.propTypes = {
    className: PropTypes.string,
};

export default DefaultAvatar;
