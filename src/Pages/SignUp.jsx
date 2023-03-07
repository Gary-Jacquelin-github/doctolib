import React, { useState } from 'react';
import '../css/login.css'
import { useNavigate } from 'react-router-dom'
import initConnexion from '../firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

initConnexion();

function SignUp() {
  
  const navigate = useNavigate();
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { 
    const user = userCredential.user;
    if(user){
      navigate('/')
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
    
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h2>Creation compte</h2>
        <label>
          Email:
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button className="button" type="submit">Créer le compte</button>
      </form>
    </div>
  );
}

export default SignUp;