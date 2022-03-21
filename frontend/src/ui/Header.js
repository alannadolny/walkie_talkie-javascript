import { useState } from "react";
import walkieTalkie from '../walkie-talkie.png';

function Header(){ 

    return <header>
        <div id="header-left-container">
            <a href="" > <img id="logo" src={walkieTalkie}/> </a>
            <h1> Walkie Talkie </h1>
        </div> 
        <nav className="nav">
            <ul>
                <li> <a href=""> HOME </a> </li>
                <li> <a href=""> ABOUT </a> </li>
                <li> <a href=""> CONTACT </a> </li>
                <li> <a href=""> SIGN IN </a> </li>
                <li> <a href=""> REGISTER </a> </li>
            </ul>
        </nav>
    </header>
}

export default Header;