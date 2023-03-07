import React, { useState } from 'react';
import '../css/login.css'
import { useNavigate } from 'react-router-dom'
import initConnexion from '../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

initConnexion();

function LoginPage() {
  
  const navigate = useNavigate();
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
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
        <label>
          Confirm Password:
          <input type="password" value={confirmpassword} onChange={handleConfirmPasswordChange} />
        </label>
        <br />
        <button className="button" type="submit">Créer le compte</button>
      </form>
    </div>
  );
}

export default LoginPage;