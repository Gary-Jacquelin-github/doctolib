import React, { useState, useEffect  } from 'react';
import '../css/login.css'
import { useNavigate,Link } from 'react-router-dom'
import initConnexion from '../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

initConnexion();

function LoginPage() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User installed the app');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => { 
    const user = userCredential.user;
    if(user){
      navigate('/choix')
    }else {
      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      } else {
        console.log('La vibration n\'est pas supportée par cet appareil.');
      }
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  };

  return (
    <div className="login-page">
      <div className="cadre">
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
        <br />
      </form>
      <br />
      <button onClick={handleClick} className="button">
      Télécharger l'application
    </button>
    </div>
    </div>
  );
}

export default LoginPage;