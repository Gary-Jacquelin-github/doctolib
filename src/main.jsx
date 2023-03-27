import React from 'react'
import ReactDOM from 'react-dom'
import App from './Pages/App'
import Rdv from './Pages/rdv'
import RdvConfirm from './Pages/rdvConfirm'
import Choix from './Pages/choix'
import Liste from './Pages/listeRdv'
import './css/index.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
  <Routes>
    <Route path='/rdv' element={<Rdv />} />
    <Route path='/' element={<App />} />
    <Route path='/rdvConfirm' element={<RdvConfirm />} />
    <Route path='/choix' element={<Choix />} />
    <Route path='/liste' element={<Liste />} />
  </Routes>
  </BrowserRouter>,
    
  document.getElementById('root')
)
