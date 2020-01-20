import React from 'react';
import styled from 'styled-components';
import { Button, Form } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { useFormFields } from '../libs/hookslib';

const LoginWrapper = styled.div`
  padding: 60px 0;
`;

const LoginForm = styled.form`
  margin: 0 auto;
  max-width: 500px;
`;

export default function Login(props) {
  //   const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: ''
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await Auth.signIn(fields.email, fields.password);
      props.userHasAuthenticated(true);
      props.setActive('home');
      props.history.push('/');
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <LoginWrapper>
      <LoginForm onSubmit={handleSubmit}>
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
            value={fields.password}
            onChange={handleFieldChange}
            type="password"
          />
        </Form.Group>
        <Button block disabled={!validateForm()} type="submit">
          Login
        </Button>
      </LoginForm>
    </LoginWrapper>
  );
}
