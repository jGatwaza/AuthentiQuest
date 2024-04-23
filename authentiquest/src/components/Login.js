
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { database } from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function
  const history = useNavigate();

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (type === 'Sign Up'){
    createUserWithEmailAndPassword(database, email, password)
      .then(data => {
        console.log(data, "authData");
        history('/challenge'); // Use navigate function here
      }).catch(err => alert(err));
    } else {
      signInWithEmailAndPassword(database, email, password)
      .then(data => {
        console.log(data, "authData");
        history('/challenge'); // Use navigate function here
      }). catch(err => {alert(err); setLogin(true)});
  };
  }
  return (
    <div className='App'>
      <div className='rowe'>
        <div className = {login == false? 'activeColor' :'pointer'} onClick={() => setLogin(false)}>Sign Up</div>
        <div className = {login == true? 'activeColor' :'pointer'} onClick={() => setLogin(true)}>Sign In</div>
      </div>
      <h1>{login?'Sign In':'Sign Up'}</h1>
    <form onSubmit={(e) =>handleSubmit(e, login?'Sign In':'Sign Up')}>
      <input type="email" name="email" />
      <input type="password" name="password"  />
      <button type="submit">{login?'Sign In':'Sign Up'}</button>
    </form>
    </div>
  );
}

export default Login;


