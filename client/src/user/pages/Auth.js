import React, {useState, useContext} from 'react';

import './Auth.css';
import { useForm } from '../../shared/hooks/form-hook';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import Card from '../../shared/components/UIElements/Card';
import { AuthContext } from '../../shared/context/auth-context';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    },
  }, false);



  const authenticateHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
  }

  const switchModeHandler = () => {
    if(!isLoginMode) setFormData({
      ...formState.inputs, 
      name: undefined
    }, formState.inputs.email.isValid && formState.inputs.password.isValid);
    else setFormData({
      ...formState.inputs, 
      name:{
        value:'',
        isValid:false
      }
    }, false);

    setIsLoginMode(prevMode => !prevMode)
  }


  return <Card className='authentication'>
    <form className="place-form" onSubmit={authenticateHandler}>
      <h2>Login Required</h2>
      <hr></hr>
      {!isLoginMode && <Input 
                          element='input'
                          id='name'
                          type='text'
                          label='Your name'
                          validators={[VALIDATOR_REQUIRE()]}
                          errorText='Please enter a valid name'
                          onInput={inputHandler} ></Input>}
      <Input 
        id='email'
        element='input' 
        type="email" 
        label="Email" 
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]} 
        errorText="Please enter a valid email"
        onInput={inputHandler}></Input>

      <Input 
        id='password'
        element='input' 
        type="password" 
        label="Password" 
        validators={[VALIDATOR_MINLENGTH(5)]} 
        errorText="Please enter a valid password, at least 5 characters"
        onInput={inputHandler}></Input>

        <Button type='submit' disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
  </form>
  <Button inverse onClick={switchModeHandler}>Switch to {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
  </Card>
};

export default Auth;
