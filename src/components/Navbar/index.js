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
    NavRight,
} from "./NavbarElements";
import logoImg from './Logo-vertical-white.png';


function Index() {
    return (
        <>
            <Nav>
                <NavBtnLinkHome to="/"> <Logo src={logoImg} alt='Logo'/></NavBtnLinkHome>
                <Bars/>
                <NavMenu>
                    <NavLink to="/cities" activeStyle>
                        Cities
                    </NavLink>
                    <NavLink to="/maps" activeStyle>
                        Map
                    </NavLink>
                    <NavLink to="/sing-up" activeStyle>
                        Sign Up
                    </NavLink>
                    <NavRight to="/sign-in" activeStyle>
                        Sign Up
                    </NavRight>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/sign-in">Sign In</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
}

export default Index
