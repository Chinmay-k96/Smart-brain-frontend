import React from 'react';

const Navigation = ({onRouteChange, isSignedIn }) => {
		if (isSignedIn === 'h') {
			return (
				console.log('enter navigation for home page'),
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			  		<h1 onClick={() => onRouteChange('SignIn')} className='f3 link dim white underline pa3 pointer'>Sign Out</h1>
				</nav>
				);
		}
		else if (isSignedIn === 's') {
			return (
				console.log('enter navigation for signin page'),
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
		  		<h1 onClick={() => onRouteChange('register')} className='f3 link dim white underline pa3 pointer'>Register</h1>
			</nav>
				);
		}
		else {
			return (
				console.log('enter navigation for registration page'),
				<nav style={{display: 'flex', justifyContent: 'center'}}>
					<h1 className='f2 link dim white underline pa3'>Welcome..!!! Register to access our API</h1>
				</nav>
				);
		}	
}

export default Navigation;