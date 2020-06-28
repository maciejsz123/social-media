import React, { useState } from 'react';
import fire from '../../fire.js';
import './login.sass';

const Login = () => {
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('testtest');
  const [loginSelected, setLoginSelected] = useState(true);
  const db = fire.firestore();

  function login(e) {
    e.preventDefault();

    fire.auth().signInWithEmailAndPassword(email, password)
    .then( user => console.log('logged'))
    .catch( error => console.log('error'))
  }

  function register(e) {
    e.preventDefault();

    fire.auth().createUserWithEmailAndPassword(email, password)
    .then( user => {
      db.collection('users').add({ name: email, friends: [] });
    })
    .catch( error => console.log('error'))
  }

  return (
    <div className='login-view'>
      <div className='login-component'>
        <div className='login-title'>
          <span className={ `${loginSelected ? 'underline' : ''}` } onClick={ () => setLoginSelected(true) }>Login</span>
          <span className={ `${loginSelected ? '' : 'underline'}` } onClick={ () => setLoginSelected(false) }>Register</span>
        </div>
        <form className='login-form' onSubmit={ loginSelected ? login : register }>
          <div>
            <label>
              <input type='text' placeholder='e-mail' onChange={ (e) => setEmail(e.target.value)} value={email} />
            </label>
          </div>
          <div>
            <label>
              <input type='password' placeholder='password' onChange={ (e) => setPassword(e.target.value)} value={password} />
            </label>
          </div>
          <button>{ loginSelected ? 'Login' : 'Register' }</button>
        </form>
      </div>
    </div>
  )
}

export default Login;
