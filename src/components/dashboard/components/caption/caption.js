import React from 'react';
import './caption.scss';
 function Caption(props) {

    return (
        <>
        <div className="header">
         <h3>{ props.caption.toUpperCase()}</h3> 
       </div>
        </>
    )
}

export default Caption
