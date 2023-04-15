import styled from "styled-components";
import backgroundImage from "./background_forest.jpg";
export const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(${backgroundImage});
  background-size: cover;
  opacity: 0.9;
  height: 100vh;

  @media screen and (max-width: 400px) {
    height: 80%;
  }
`;

export const FormContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 480px) {
        padding: 10px;
    }
`;

export const Form = styled.form`
  max-width: 400px;
  width: 100%;
  justify-content: center;
  z-index: 1;
  display: grid;
  margin: 0 auto;
  padding: 50px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;
export const FormH1 = styled.h1`
    margin-bottom: 40px;
    color: #fff;
    font-size: 30px;
    font-weight: 400;
    text-align: center;
`;

export const FormLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    color: #fff;
`;

export const FormInput = styled.input`
    padding: 16px 16px;
    margin-bottom: 32px;
    border: none;
    border-radius: 4px;
`;

export const FormButton = styled.button`
    background: #333333;
    padding: 16px 0;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #252e48;
    color: #ffffff;
  }
`;

export const Text = styled.span`
  text-align: center;
  margin-top: 30px;
  color: #fff;
  font-size: 17px;

  &:hover {
    color: #333333;
    cursor: pointer;
  }
`;

export const SignUpText = styled.p`
  margin-top: 30px;
  color: #fff;
  font-size: 17px;
  text-align: center;

  &:hover {
    color: #333333;
    cursor: pointer;
  }
`;

