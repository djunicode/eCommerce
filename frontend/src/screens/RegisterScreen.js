import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';
import {
  StyledContainerDiv,
  StyledContainerDiv2,
  StyledHeader,
} from '../util/StyledComponents';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [validationStatus, setValidationStatus] = useState({
    name: false,
    number: false,
    email: false,
  });

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search
    ? location.search.split('=')[1]
    : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const validationFunc = (nameParam, numberParam, emailParam) => {
    if (nameParam) {
      const nameRegex = /[A-Za-z ]+$/;
      console.log(nameParam.match(nameRegex));
      // console.log(name);
      if (nameParam.match(nameRegex)) {
        setValidationStatus({
          name: true,
          number: validationStatus.number,
          email: validationStatus.email,
        });
      } else {
        setValidationStatus({
          name: false,
          number: validationStatus.number,
          email: validationStatus.email,
        });
      }
    }

    if (numberParam) {
      const numberRegex = /^\d{10}$/;
      // console.log(numberParam);
      if (numberParam.match(numberRegex)) {
        setValidationStatus({
          name: validationStatus.name,
          number: true,
          email: validationStatus.email,
        });
      } else {
        setValidationStatus({
          name: validationStatus.name,
          number: false,
          email: validationStatus.email,
        });
      }
    }

    if (emailParam) {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // console.log(emailRegex.test(String(email).toLowerCase()));
      if (emailRegex.test(String(emailParam).toLowerCase())) {
        setValidationStatus({
          name: validationStatus.name,
          number: validationStatus.number,
          email: true,
        });
      } else {
        setValidationStatus({
          name: validationStatus.name,
          number: validationStatus.number,
          email: false,
        });
      }
    }
  };

  useEffect(() => {
    validationFunc(name, number, email);
  }, [name, number, email]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      password !== confirmPassword ||
      validationStatus.email === false ||
      validationStatus.name === false ||
      validationStatus.number === false
    ) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, number, email, password));
    }
  };

  return (
    <>
      <StyledContainerDiv>
        <StyledContainerDiv2>
          <StyledHeader>SIGN UP</StyledHeader>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={
                  !validationStatus.name && name.length !== 0
                    ? 'red'
                    : ''
                }
              />
            </Form.Group>

            <Form.Group controlId="number">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text/number"
                placeholder="Enter Phone No"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
                className={
                  !validationStatus.number && number.length !== 0
                    ? 'red'
                    : ''
                }
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={
                  !validationStatus.email && email.length !== 0
                    ? 'red'
                    : ''
                }
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="danger" block>
              Create Account
            </Button>
          </Form>

          <Row className="py-3">
            <Col style={{ textAlign: 'center' }}>
              Already have an Account?{' '}
              <Link
                to={
                  redirect ? `/login?redirect=${redirect}` : '/login'
                }
                style={{ color: 'blue', textDecoration: 'underline' }}
              >
                Login
              </Link>
            </Col>
          </Row>
        </StyledContainerDiv2>
      </StyledContainerDiv>
    </>
  );
};

export default RegisterScreen;
