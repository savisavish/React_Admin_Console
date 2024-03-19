import React from 'react';
const Download = ({ onClick }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };
    return (
        <a className="download" onClick={handleClick}>DOWNLOAD<span><img src={require('../../images/download.png')} /></span></a>
    );
};
export default Download;