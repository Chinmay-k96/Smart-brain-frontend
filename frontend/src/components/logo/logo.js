import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './logo.css';


const Logo = () => {
	return (
		<>
			<Tilt className="Tilt br2 shadow-3 ml5" style={{height: 125, width: 125 }}>
				 <div className="Tilt-inner pa2"><img alt='logo' src={brain}/></div>
			</Tilt>
		</>
	);  
}

export default Logo;