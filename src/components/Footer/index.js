import React from 'react';
import { FooterContainer, FooterLink } from './FooterElements';

function Footer() {
    return (
        <FooterContainer>
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/about-us">About</FooterLink>
            <FooterLink href="/contacts">Contact</FooterLink>
        </FooterContainer>
    );
}

export default Footer;
