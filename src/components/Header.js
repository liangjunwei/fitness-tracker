import React from 'react';
import Nav from './Nav';

const Header = ({ token, setToken, setUsername }) => {
    return (
        <div id='header'>
            <h1>FitnessTrac.kr</h1>
            {/* pass token to set the link and log out button */}
            <Nav token={token} setToken={setToken} setUsername={setUsername}/>
        </div>
    )
}

export default Header;