import styled from 'styled-components';

export const FooterContainer = styled.footer`
  display: flex;
  background-color: #2C3333;
  flex-direction: column;
  min-height: 10vh;
  color: #fff;
  justify-content: center;
  align-items: center;
  padding: 2.4rem 0;
  position: absolute;
  width: 100%;
  margin-bottom: 3rem;

  .rights p {
    color: #fff;
    margin-top: 2rem;
  }
  
  .grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 3rem;
  }

  .grid-item {
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .grid-logos img {
    width: 100px;
  }
  
  .grid-item h3 {
    color: #fff;
    // add space after heading
    margin-bottom: 0.5rem;
  }
  
  .grid-item p {
    color: #fff;
    margin-bottom: 1rem;
  }

  .grid-logos {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    
    .aqi-logo {
      border-radius: 50%;
      width: 50px;
      margin-left: 1rem;
    }
    
    .h3 {
      color: #fff;
    }
  }
`;


export const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin: 0.5rem;
  &:hover {
    color: #0E8388;
  }
`;
