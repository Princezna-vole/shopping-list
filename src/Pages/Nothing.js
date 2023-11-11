import React from 'react'

function Nothing() {
  return (
    <div
    style={{
      position: 'fixed',
      height:'100vh',
      top:'0px',
      left: '50%',
      transform: 'translate(-50%, 0%)',
      borderTop:'none',
      width: '500px',
      padding: '20px',
      border: '1px solid rgb(170, 170, 219)',
      backgroundColor: 'rgb(237, 238, 238)',
     
    }}
  >
       
    <p>You have been removed from the list. Nothing else to see here.</p>
  </div>
 
  )
}

export default Nothing