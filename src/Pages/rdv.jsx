import React, { useState,useEffect  } from "react";
import "../css/rdv.css";
import initConnexion from '../firebase';
import { useNavigate } from 'react-router-dom'
import db from '../firebase';
import 'react-datepicker/dist/react-datepicker.css';
import { collection, getDocs , addDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";

initConnexion();
export default function RdvPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [medecins, setMedecins] = useState([]);
  useEffect(() => {
    const fetchMedecins = async () => {
      const querySnapshot = await getDocs(collection(db, "medecins"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        nomComplet: `${doc.data().nom} ${doc.data().prenom}`
      }));
      setMedecins(data);
    };
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        fetchMedecins();
      }
    });
  }, []);
  function handleNameChange(e) {
    setName(e.target.value);
  }
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const user = getAuth().currentUser;
    try {
      const docRef = await addDoc(collection(db, "rdv"), {
        patient: user.uid,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        date: date,
        time: time
      });
      if(docRef){
        navigate('/rdvConfirm')
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout en bdd: ", error);
    }
    
  }

  return (
    <div className="appointment-page">
      <h1>Prendre un rendez-vous</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prénom:
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
        </label>
        <label>
          Nom:
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Téléphone:
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </label>
        <label>
          Heure:
          <input
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            required
          />
        </label>
        <label htmlFor="select-name">Nom:</label>
        <select id="select-name" className="form-select" onChange={handleNameChange}>
          {medecins.map((medecin) => (
            <option key={medecin.id} value={medecin.id}>{medecin.nomComplet}</option>
          ))}
        </select>
        <button type="submit">Confirmer le rendez-vous</button>
      </form>
    </div>
  );
}