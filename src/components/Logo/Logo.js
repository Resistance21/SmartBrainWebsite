import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'
import Brain from './brain_logo.png';

 const Logo = () =>{
     return(
        <div className='ma4 mt0'>
            <Tilt className="Tilt" options={{ max : 25 }} style={{ height: 150, width: 150, border: '2px solid' }} >
                <div className="Tilt-inner pa3">
                    <img style={{paddingTop: '25px'}} src={Brain}></img>
                </div>
            </Tilt>
        </div>
     )
 }

 export default Logo;
