import React, { useState }  from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import AdminPage from './pages/admin/AdminPage';
import ConfirmationMessage from './pages/user/ConfirmationMessage';
import TicketPage from './pages/user/TicketPage';
import axios from "axios";

function App() {
  return (
    <Routes>
      <Route index element={<HomeScreen />} />
      <Route path='/adminPage' element={<AdminPage />} />
      <Route path='/confirmationMessage' element={<ConfirmationMessage />} />
      <Route path='/tickets/:id' element={<TicketPage />} />
    </Routes>
  );
}

function HomeScreen() {
  const nav = useNavigate()
  const [formData, setFormData] = useState({
    reporterName: '',
    reporterEmail: '',
    description: ''
  });
  const [errorSubmitting, setErrorSubmitting] = useState(false)

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const link = `http://localhost:3001/api/tickets`;
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    
    axios.post(link, formData).then(() => 
      nav('/confirmationMessage')
    ).catch( () => {
      setErrorSubmitting(true)
    })
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: 400, margin: 10, padding: 20}}>
      <img alt="Zealthy logo in black" loading="lazy" src="https://assets-global.website-files.com/64ac3a433180d94638a63ead/64acc00e5f8b28a1f8b430a9_Logo-Zealthy-Black.svg"
       style={{width: 200, marginBottom: 20}}/>
      <a href='/adminPage'>Go To Admin Page</a>
      <h2>Help Desk Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{display: 'flex', flexDirection: 'column', marginBottom: 10}}>
          <label htmlFor="reporterName">Name:</label>
          <input
            type="text"
            id="reporterName"
            name="reporterName"
            value={formData.reporterName}
            onChange={handleChange}
            style={{flex: 'row'}}
            required
          />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', marginBottom: 10}}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="reporterEmail"
            name="reporterEmail"
            value={formData.reporterEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', marginBottom: 10}}>
          <label htmlFor="description">Problem Description(Maximum 250 letters):</label>
          <textarea
            id="description"
            name="description"
            style={{height: 100}}
            value={formData.description}
            onChange={handleChange}
            required maxLength={250}
          />
        </div>
        <button type="submit">Submit</button>
        {errorSubmitting && <div className="error">An error occured while submitting the ticket. Please try again later</div>}
      </form>
    </div>
  );
}

export default App;
