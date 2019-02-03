import React, { Component } from "react";

const DefaultAvatar = (props) => (
    <img src="/images/book-fff.svg" className={props.className ? props.className : ''} />
);
export default DefaultAvatar;
