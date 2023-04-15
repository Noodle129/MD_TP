import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #2C3333;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin: 0.5rem;
  &:hover {
    color: #0E8388;
  }
`;
