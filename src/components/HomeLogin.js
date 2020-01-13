import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

const Layout = styled.div`
  display: grid;
`;

const Welcome = styled.div`
  grid-column: 1;
  background-color: #000;
  height: 100vh;
  width: 100%;
`;

const Login = styled.div`
  grid-column: 2;
  text-align: left;
  @media all and (min-width: 480px) {
      padding: 5rem;
`;

export default function HomeLogin(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <React.Fragment>
      <Layout>
        <Welcome>Lorem Ipsum is simply dummy text.</Welcome>
        <Login>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" disabled={!validateForm()} type="submit">
              Submit
            </Button>
          </Form>
        </Login>
      </Layout>
    </React.Fragment>
  );
}
