import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormFields } from '../libs/hookslib';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';

const SignupDiv = styled.div`
  padding: 60px 0;
`;

const SignupForm = styled.form`
  margin: 0 auto;
  max-width: 320px;
`;

export default function Signup(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: ''
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);

      props.userHasAuthenticated(true);
      props.setActive('home');
      props.history.push('/');
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <SignupForm onSubmit={handleConfirmationSubmit}>
        <Form.Group controlId="confirmationCode">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <Form.Text
            style={{ fontSize: '14px', paddingBottom: '10px', color: '#999' }}
          >
            Please check your email for the code.
          </Form.Text>
        </Form.Group>
        <Button
          block
          type="submit"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </Button>
      </SignupForm>
    );
  }

  function renderForm() {
    return (
      <SignupForm onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </Form.Group>
        <Button
          block
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </Button>
      </SignupForm>
    );
  }

  return (
    <SignupDiv>
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </SignupDiv>
  );
}
