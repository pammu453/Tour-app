import React from 'react';
import {useNavigate} from 'react-router-dom'

const LogOut = () => {
    const navigate=useNavigate();
  return (
    <div style={{marginTop:"200px"}}>
        <button onClick={()=>{navigate("/")}} style={{padding:"10px",borderRadius:"10px",border:"none"}}>
            <img style={{backgroundColor:"white"}} src="https://www.pngkit.com/png/full/369-3693709_return-to-home-button-return-home-page-button.png" alt="Back to home page" />
        </button>
    </div>
  )
}

export default LogOut;
