import React from 'react'

export default function Homepage({name}) {
  return (
    <div className='signuppage'>
        <h1 style={{
            color:'white',
            fontSize :"50px",
            textShadow : "0px 0px 10px var(--color4)",
            fontFamily:'cursive monospace',
            borderTop : "5px solid white",
            borderBottom : "5px solid white",
            padding:"20px"
        }}>Welcome! {name}</h1>
    </div>
  )
}
