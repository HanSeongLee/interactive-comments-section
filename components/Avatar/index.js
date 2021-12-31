import React from "react";
import styles from './style.module.scss';

const Avatar = ({ webp, png, ...props }) => {
    return (
        <picture>
            <source srcSet={webp} type="image/webp"/>
            <source srcSet={png} type="image/png"/>
            <img src={png} {...props} />
        </picture>
    );
};

export default Avatar;
