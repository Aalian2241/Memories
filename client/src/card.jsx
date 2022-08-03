import React, {useEffect, useState} from 'react';

export const Card = (props) => {
  
    const onClicked= ()=>{
        console.log('Card clicked');
        
    }
    return ( 
    
    <div className="card">
        <h1 onClick={onClicked}>hello {props.a}</h1>
    </div>
    )
};