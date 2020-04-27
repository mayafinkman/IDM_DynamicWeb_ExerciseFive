import React from 'react';

function Header({ LogoutFunction, isLoggedIn }) {
    console.log("logged in is " + isLoggedIn);
    return (
        <header className="Header">
            <nav className="Header_nav">
                {isLoggedIn && <a href="/">Profile</a>}
                {!isLoggedIn && <a href="/create-account">Create account</a>}
                {!isLoggedIn && <a href="/login">Login</a>}
                {isLoggedIn && <a href="" onClick={() => LogoutFunction()}>Log out</a>}
            </nav>
        </header>
    );
}
export default Header;