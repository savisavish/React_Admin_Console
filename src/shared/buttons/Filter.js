import React from 'react'

const Filter = ({ onClick }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };
    return (
        <>
           <a className="filter" onClick={handleClick}>Filter<span><img src={require('../../images/filter.svg')} /></span></a>
        </>
    )
}

export default Filter
