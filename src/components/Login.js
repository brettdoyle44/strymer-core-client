import React, { useContext } from 'react';
import { Context } from '../context/store';
import styled from 'styled-components';
import { Button, Form } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { useFormFields } from '../libs/hookslib';
import { Link } from 'react-router-dom';

const LoginWrapper = styled.div`
  grid-area: bottom;
  padding: 60px;
`;

const LoginForm = styled.form`
  margin: 0 auto;
  min-width: 25vw;
`;

const LoginLayout = styled.div`
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

export default function Login(props) {
  //   const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: ''
  });
  const { store, dispatch } = useContext(Context);

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await Auth.signIn(fields.email, fields.password);
      dispatch({ type: 'USER_HAS_AUTH' });
      dispatch({ type: 'ACTIVE_NAV', payload: 'home' });
      console.log(store.active);
      props.history.push('/');
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <LoginLayout>
      <TopSide>
        <h1>Sign in</h1>
        <p>
          Don't have an account?{' '}
          <Link
            to="/"
            onClick={() => dispatch({ type: 'SIGN_IN', payload: false })}
          >
            Sign up
          </Link>
          .
        </p>
      </TopSide>
      <LoginWrapper>
        <LoginForm onSubmit={handleSubmit}>
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
              value={fields.password}
              onChange={handleFieldChange}
              type="password"
              placeholder="Password"
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
            disabled={!validateForm()}
            type="submit"
          >
            Login
          </Button>
        </LoginForm>
      </LoginWrapper>
    </LoginLayout>
  );
}
