import * as React from 'react';

interface Props {
    src: string;
}

const ImageCard: React.FC<Props> = props => <img src={props.src} className="img-fluid card" />;

export default ImageCard;
