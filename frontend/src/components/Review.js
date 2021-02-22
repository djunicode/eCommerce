import React from 'react';
import Rating from './Rating';

function Review() {
  return (
    <div>
      <hr/>
      <Rating value={4.5} text=""/>
      <p className="mt-2" style={{marginBottom:'1px', color:'black'}}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum tempore porro adipisci eos asperiores, explicabo repellendus sed beatae quaerat assumenda in reiciendis aut. Quis, nihil voluptatibus illo aliquam ullam officiis!
      </p>
      <p style={{color:"#5F5F5F"}}><small>Dhiraj Shah</small>&nbsp;|&nbsp;<small>16 Jan 2021</small></p>
      <hr/>
    </div>
  )
}

export default Review
