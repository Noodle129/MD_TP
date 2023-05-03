import React from 'react';
import { FooterContainer, FooterLink } from './FooterElements';

function Footer() {
    return (
        <FooterContainer>
            <div className="grid-container">
                <div className="grid-logos">
                    <img src={process.env.PUBLIC_URL + '/openaq-logo.png'} alt="openaq logo" />
                    <img src={process.env.PUBLIC_URL + '/tomtom-logo.png'} alt="tomtom logo" />
                    <img src={process.env.PUBLIC_URL + '/openweather-logo.png'} alt="openweather logo" />
                    <img src={process.env.PUBLIC_URL + '/aqi-logo.png'} alt="aqi logo" className="aqi-logo"/>
                </div>
                <div className="grid-item">
                    <h3>Links</h3>
                    <FooterLink href="/">Home</FooterLink>
                    <FooterLink href="/cities">Cities</FooterLink>
                    <FooterLink href="/map">Map</FooterLink>
                </div>
                <div className="grid-item">
                    <h3>Social Media</h3>
                    <FooterLink href="https://github.com/Diogo-da-Silva-Rebelo" target="_blank">Github</FooterLink>
                    <FooterLink href="https://www.linkedin.com/in/diogo-rebelo-8a2150272/" target="_blank">Linkedin</FooterLink>
                </div>
                <div className="grid-item">
                    <h3>From</h3>
                    <p>Purp Street</p>
                    <p>Areias Street</p>
                    <p>Braga, Portugal</p>
                </div>
            </div>
            <div className="rights">
                <p>© 2023 All rights reserved</p>
            </div>
        </FooterContainer>

    );
}

export default Footer;