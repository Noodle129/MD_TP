/* login form index file */
import React from 'react';
import {Form, FormH1, FormLabel, FormInput, FormButton, Text, FormWrap, FormContent, SignUpText} from './LoginElements';
const LoginForm = () => {
     return (
         <FormWrap>
             <FormContent>
             <Form>
                 <FormH1>Sign in to your account</FormH1>
                 <FormLabel htmlFor='for'>Email</FormLabel>
                 <FormInput type='email' required />
                 <FormLabel htmlFor='for'>Password</FormLabel>
                 <FormInput type='password' required />
                 <FormButton type='submit'>Continue</FormButton>
                 <Text>Forgot password</Text>
                 <SignUpText>Don't have an account? Sign up today</SignUpText>
             </Form>
                </FormContent>
            </FormWrap>
     );
 }

export default LoginForm;