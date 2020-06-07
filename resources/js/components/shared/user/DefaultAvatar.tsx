import * as React from 'react';

interface Props {
    className?: string;
}

const DefaultAvatar: React.FC<Props> = props => (
    <img src="/images/book-fff.svg" className={props.className ? props.className : ''} />
);

export default DefaultAvatar;
