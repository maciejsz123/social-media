import React, { useState, useEffect } from 'react';
import './App.sass';
import fire from './fire';
import Home from './components/home/home';
import Login from './components/login/login';

function App() {
  const [user, setUser] = useState(null);

  useEffect( () => {
    fire.auth().onAuthStateChanged( user => {
      if(user) {
        setUser(user);
      } else {
        setUser(null);
      }
    })
  }, []);

  return (
    <div className="App">
      {user ? <Home /> : <Login />}
    </div>
  );
}

export default App;
