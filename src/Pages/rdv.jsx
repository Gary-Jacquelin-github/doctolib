import React, { useState } from "react";
import "../css/rdv.css";
import initConnexion from '../firebase';
import { getAuth } from "firebase/auth"

initConnexion();
export default function AppointmentPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const auth = getAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    // push({
    //   firstName: firstName,
    //   lastName: lastName,
    //   email: email,
    //   phone: phone,
    //   date: date,
    //   time: time
    // });
  };

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
        <button type="submit">Confirmer le rendez-vous</button>
      </form>
    </div>
  );
}