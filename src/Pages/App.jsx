import React, { useState } from 'react';
import '../css/login.css'
import { useNavigate,Link } from 'react-router-dom'
import initConnexion from '../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

initConnexion();

function LoginPage() {
  
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
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { 
    const user = userCredential.user;
    if(user){
      navigate('/rdv')
    }else {
      window.navigator.vibrate(200);
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
        <h2>Login</h2>
        <label>
          Email:
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button className="button" type="submit">Login</button>
        
        <br />
        <Link className="button" to="/signup">Créer un compte (En maintenance)</Link>
      </form>
    </div>
  );
}

export default LoginPage;