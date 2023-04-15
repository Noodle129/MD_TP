import React from 'react'

import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
    NavBtnLinkHome,
    Logo,
} from "./NavbarElements";
import logoImg from './Logo-vertical-white.png';


function Index() {
    return (
        <>
            <Nav>
                <NavBtnLinkHome to="/"> <Logo src={logoImg} alt='Logo'/></NavBtnLinkHome>
                <Bars/>
                <NavMenu>
                    <NavLink to="/cities">
                        Cities
                    </NavLink>
                    <NavLink to="/maps">
                        Map
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/login">Login</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
}

export default Index
