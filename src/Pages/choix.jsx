import { Link } from 'react-router-dom'
import '../css/login.css'
function choix() {
  
  return (
    <div className="login-page">
      <div className="cadre">
        <Link className="button" to="/rdv">Ajouter un rdv</Link>
        <br />
        <Link className="button" to="/liste">Mes rdv</Link>
      </div>
    </div> 
  );
}

export default choix;