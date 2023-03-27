import React, { useState } from 'react';

import '../css/login.css'
function AppointmentList() {
  const [appointments, setAppointments] = useState([
    { id: 1, date: '01/04/2023', time: '10:00', name: 'John Doe', phone: '123-456-7890' },
    { id: 2, date: '03/04/2023', time: '14:00', name: 'Jane Smith', phone: '555-555-5555' }
  ]);

  // Fonction pour télécharger le fichier ICS
  const downloadICS = () => {
    var calendarData = 'BEGIN:VCALENDAR';
    calendarData += '\nVERSION:2.0';
    calendarData += '\nCALSCALE:GREGORIAN';
    calendarData += '\nPRODID:adamgibbons/ics';
    calendarData += '\nMETHOD:PUBLISH';
    calendarData += '\nX-PUBLISHED-TTL:PT1H';

    appointments.forEach((appointment) => {
      const eventDate = appointment.date.split('/').reverse().join('');
      const eventStartTime = appointment.time.split(':').join('');
      const eventEndTime = (parseInt(eventStartTime) + 100).toString();
      const eventTitle = `Rendez vous chez ${appointment.name}`;
      const eventLocation = 'Rdv chez le medeinc';
      var eventData = `\nBEGIN:VEVENT`;
      eventData += `\nSUMMARY:${eventLocation}`;
      eventData += `\nDTSTART:${eventDate}T${eventStartTime}00`;
       eventData += `\nDTEND:${eventDate}T${eventEndTime}00`;
       eventData += `\nDESCRIPTION:${eventTitle}`;
       eventData += `\nLOCATION:${eventLocation}`;
       eventData += `\nEND:VEVENT`;
      calendarData += eventData;
    });
    calendarData += '\nEND:VCALENDAR';
    const blob = new Blob([calendarData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'appointments.ics');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="login-page">
      <div className="cadre">
        <h2>Appointment List</h2>
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Name</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.name}</td>
                <td>{appointment.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={downloadICS}>Download as ICS</button>
      </div>
    </div>
  );
}

export default AppointmentList;