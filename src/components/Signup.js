import React, { useState, useContext } from 'react';
import { Context } from '../context/store';
import { Form, Button } from 'react-bootstrap';
import { useFormFields } from '../libs/hookslib';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';

const SignupWrapper = styled.div`
  grid-area: bottom;
  padding: 60px;
`;

const SignupForm = styled.form`
  margin: 0 auto;
  min-width: 25vw;
`;

const SignupLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'top'
    'bottom';
`;

const TopSide = styled.div`
  grid-area: top;
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
  const { store, dispatch } = useContext(Context);

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

      dispatch({ type: 'USER_HAS_AUTH' });
      dispatch({ type: 'ACTIVE_NAV', payload: 'home' });
      console.log(store.active);
      props.history.push('/');
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <SignupLayout>
        <TopSide>
          <h1>Confirm Email</h1>
        </TopSide>
        <SignupWrapper>
          <SignupForm onSubmit={handleConfirmationSubmit}>
            <Form.Group controlId="confirmationCode">
              <Form.Control
                autoFocus
                type="tel"
                onChange={handleFieldChange}
                placeholder="Confirmation Code"
                value={fields.confirmationCode}
                style={{ borderRadius: '50px', padding: '1.5em' }}
              />
              <Form.Text
                style={{
                  fontSize: '14px',
                  paddingBottom: '10px',
                  color: '#999'
                }}
              >
                Please check your email for the code.
              </Form.Text>
            </Form.Group>
            <Button
              style={{
                borderRadius: '50px',
                padding: '0.75em',
                backgroundColor: '#ec1966',
                border: '1px solid #ec1966'
              }}
              block
              type="submit"
              isLoading={isLoading}
              disabled={!validateConfirmationForm()}
            >
              Verify
            </Button>
          </SignupForm>
        </SignupWrapper>
      </SignupLayout>
    );
  }

  function renderForm() {
    return (
      <SignupLayout>
        <TopSide>
          <h1>Sign up</h1>
          <p>
            Already have an account?{' '}
            <Link
              to="/"
              onClick={() => dispatch({ type: 'SIGN_IN', payload: true })}
            >
              Sign in
            </Link>
            .
          </p>
        </TopSide>
        <SignupWrapper>
          <SignupForm onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Control
                autoFocus
                type="email"
                value={fields.email}
                onChange={handleFieldChange}
                placeholder="Email"
                style={{ borderRadius: '50px', padding: '1.5em' }}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Control
                type="password"
                value={fields.password}
                onChange={handleFieldChange}
                placeholder="Password"
                style={{ borderRadius: '50px', padding: '1.5em' }}
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Control
                type="password"
                onChange={handleFieldChange}
                value={fields.confirmPassword}
                placeholder="Confirm Password"
                style={{ borderRadius: '50px', padding: '1.5em' }}
              />
            </Form.Group>
            <Button
              style={{
                borderRadius: '50px',
                padding: '0.75em',
                backgroundColor: '#ec1966',
                border: '1px solid #ec1966'
              }}
              block
              type="submit"
              isLoading={isLoading}
              disabled={!validateForm()}
            >
              Signup
            </Button>
          </SignupForm>
        </SignupWrapper>
      </SignupLayout>
    );
  }

  return <>{newUser === null ? renderForm() : renderConfirmationForm()}</>;
}
