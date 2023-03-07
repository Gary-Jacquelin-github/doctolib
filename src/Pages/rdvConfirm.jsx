import { Link } from 'react-router-dom'
import '../css/login.css'
function confirmRdv() {
  
  return (
    <div className="login-page">
        <div className="cadre">
            <label>
                Votre rendez-vous a bien été enregistré
            </label>
                <br />
            <Link className="button" to="/">Retour à la connexion</Link>
        </div>
    </div>
  );
}

export default confirmRdv;