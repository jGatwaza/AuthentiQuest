import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { database } from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
function Login() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate(); 
  const history = useNavigate();
  const { updateUserId } = useAuth();
  const handleSubmit = (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (type === 'Sign Up'){
    createUserWithEmailAndPassword(database, email, password)
      .then(data => {updateUserId(data.user.uid);
        console.log(data, "authData");
        history('/enternamepage'); 
      }).catch(err => alert(err));
    } else {
      signInWithEmailAndPassword(database, email, password)
      .then(data => {
        updateUserId(data.user.uid);
        console.log(data, "authData");
        history('/enternamepage'); 
      }). catch(err => {alert(err); setLogin(true)});
  };
  }
  return (
    <div className="page-container">
    <div className="form-container">
        <img src="https://i.ibb.co/bX9ZXjp/a-2.png" className="logo"/>
        <div className="row"> <div className='col-md-6'><h2 className= {login == false? 'activeColor title' :'pointer title'} onClick={() => setLogin(false)}>Sign Up</h2></div> <div className='col-md-6'>        <h2 className= {login == true? 'activeColor title' :'pointer title'} onClick={() => setLogin(true)}>Sign In</h2></div>
        </div>
        <form onSubmit={(e) =>handleSubmit(e, login?'Sign In':'Sign Up')}>
            <div className="input-container">
                <input type="email" name="email" placeholder="Email" className="input-field" required/>
            </div>
            
            <div className="input-container">
                <input type="password" name="password" placeholder="Password" className="input-field" required/>
            </div>
            
            <div className="login-button-container">
                <button type="submit" className="login-button">{login?'Sign In':'Sign Up'}</button>
            </div>
        </form>
    </div>
</div>
  );
}

export default Login;


