import React, { useState, useEffect } from 'react';
import fire from '../../fire.js';
import './login.sass';

const Login = () => {
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('testtest');
  const [loginSelected, setLoginSelected] = useState(true);
  const [newUser, setNewUser] = useState(false);
  const db = fire.firestore();

  function login(e) {
    e.preventDefault();

    fire.auth().signInWithEmailAndPassword(email, password)
    .then( user => console.log('logged'))
    .catch( err => console.log(err))
  }

  async function updateFirestore() {
    await db.collection('users').add({ email: email, name: email.substring(0, email.indexOf('@')), friends: [] })
    .catch( err => console.log(err))
  }

  function register(e) {
    e.preventDefault();

    fire.auth().createUserWithEmailAndPassword(email, password)
    .then( function(user) {
      setNewUser(true);
      return user;
    })
    .catch( error => console.log('error'))
  }

  useEffect( () => {
    fire.auth().onAuthStateChanged( () => {
      if(newUser) {
        updateFirestore();
        setNewUser(false);
      }
    })
  })

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
