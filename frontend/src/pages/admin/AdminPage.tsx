import React, { useState, useEffect } from 'react';
import axios from "axios";


type Ticket = {id: number, reportername: string, reporteremail: string, description: string, status: string}
const AdminPage = () => {
  const [tickets, setTickets] = useState<Array<Ticket>>([]);
  const ticketStatuses = ['new', 'in progress', 'resolved']
  const [messageSubmitted, setMessageSubmitted] = useState<Array<boolean>>([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      axios.get('http://localhost:3001/api/tickets').then((res) => {
        setTickets(res.data.tickets as unknown as Ticket[]);
      })
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleDeleteTicket = (ticketId: number) => {
    try {
      const link = 'http://localhost:3001/api/tickets/'+ ticketId
      
      axios.delete(link).then(() => {
        fetchTickets();
      })
    } catch (error) {
      console.error('Error fetching ticket:', error);
    }
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: 400, margin: 10, padding: 20}}>
      <img alt="Zealthy logo in black" loading="lazy" src="https://assets-global.website-files.com/64ac3a433180d94638a63ead/64acc00e5f8b28a1f8b430a9_Logo-Zealthy-Black.svg"
       style={{width: 200, marginBottom: 20}}/>
      <a href='/'>Back to Main Page</a>
      <h1>Ticket List</h1>
      <ul>
        {tickets.map(ticket => (
          <li>
          <a href={'/tickets/' + ticket.id}>{ticket.id} </a>
          <button style={{margin: 10}} onClick={() => handleDeleteTicket(ticket.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;