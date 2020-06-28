import React, { useState } from 'react';
import fire from '../../fire.js';

const Login = () => {
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('testtest');
  const [loginSelected, setLoginSelected] = useState(true);

  function login(e) {
    e.preventDefault();

    fire.signupWithEmailAndPassword(email, password)
    .then( user => console.log('logged'))
    .catch( error => console.log('error'))
  }

  function register(e) {
    e.preventDefault();

    fire.createUserWithEmailAndPassword(email, password)
    .then( user => console.log('registered'))
    .catch( error => console.log('error'))
  }

  return (
    <div>
      <div>
        <h2>Login</h2>
        <h2>Register</h2>
      </div>
      <form onSubmit={ loginSelected ? login : register }>
        <div>
          <label>
            email:
            <input type='text' onChange={ (e) => setEmail(e.target.value)} value={email} />
          </label>
        </div>
          <label>
            password:
            <input type='password' onChange={ (e) => setPassword(e.target.value)} value={password} />
          </label>
        <div>
        </div>
      </form>
    </div>
  )
}

export default Login;
