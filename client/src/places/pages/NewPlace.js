import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import './PlaceForm.css';
import Button from '../../shared/components/FormElements/Button';
import {useForm} from '../../shared/hooks/form-hook';


const NewPlace = () => {
  const [formState, inputHandler] = useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },
    address: {
      value: '',
      isValid: false
    },
  }, false);



  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs)
  }


  return <form className="place-form" onSubmit={placeSubmitHandler}>
    <Input 
      id='title'
      element='input' 
      type="text" 
      label="Title" 
      validators={[VALIDATOR_REQUIRE()]} 
      errorText="Please enter a valid title"
      onInput={inputHandler}></Input>

    <Input 
      id='description'
      element='textarea' 
      type="textarea" 
      label="Description" 
      validators={[VALIDATOR_MINLENGTH(5)]} 
      errorText="Please enter a valid description (at least 5 characters)"
      onInput={inputHandler}></Input>

    <Input 
      id='address'
      element='input' 
      label="Address" 
      validators={[VALIDATOR_REQUIRE()]} 
      errorText="Please enter a valid address"
      onInput={inputHandler}></Input>

      <Button type='submit' disabled={!formState.isValid}>ADD PLACE</Button>
  </form>
};

export default NewPlace;