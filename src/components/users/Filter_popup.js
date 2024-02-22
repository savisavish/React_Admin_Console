import React from 'react'

const Filter_popup = (props ) => {
    return (
        <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
    )
}

export default Filter_popup
