import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { link } from 'fs';


type Ticket = {id: number, reportername: string, reporteremail: string, description: string, status: string}
const TicketPage = () => {
  const [ticket, setTicket] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [messageSubmitted, setMessageSubmitted] = useState<boolean>(false);
  const [errorSubmitting, setErrorSubmitting] = useState<boolean>(false);
  const ticketStatuses = ['new', 'in progress', 'resolved']
  let { id } = useParams();


  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const link = 'http://localhost:3001/api/tickets/'+ id
        axios.get(link).then((res) => {
          setTicket(res.data.ticket[0] as unknown as Ticket);
          setIsLoading(false)
        })
      } catch (error) {
        console.error('Error fetching ticket:', error);
      }
    };

    fetchTicket();
  }, []);

  const handleStatusChange = (e: any) => {    
    const link = 'http://localhost:3001/api/tickets/status/'+ticket.id
    const body = {
      newStatus: e.target.value
    };
    const config = { headers: {'Content-Type': 'application/json'} };
    axios.put(link, body, config).then(() => {
      console.log('Task Status Updated');
    }).catch(() => {
      console.log('error updating Task Status');
    })
  }

  const handleResponseChange = (e: any) => {
    setResponseMessage(e.target.value)
  }

  const handleResponseSubmission = () => {
    const link = 'http://localhost:3001/api/tickets/' + ticket.id + '/submitResponse';
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const body = {
      responseMessage: responseMessage
    };
    
    axios.post(link, body, config).then(() => {
      setMessageSubmitted(true)
      setErrorSubmitting(false)
      setResponseMessage('')
    }).catch(()=> {
      setErrorSubmitting(true)
      setMessageSubmitted(false)
    })
}

  if (isLoading) {
    return <p>Loading</p>
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: 400, margin: 10, padding: 20}}>
      <img alt="Zealthy logo in black" loading="lazy" src="https://assets-global.website-files.com/64ac3a433180d94638a63ead/64acc00e5f8b28a1f8b430a9_Logo-Zealthy-Black.svg"
       style={{width: 200, marginBottom: 20}}/>
      {ticket ?
      <div>
        <a href='/adminPage'>Back to Admin Page</a>
          <p>Reporter: {ticket.reportername}</p>
          <p>Reporter Email: {ticket.reporteremail}</p>
          <select defaultValue={ticket.status} onChange={handleStatusChange}>
            <option value={ticketStatuses[0]}>{ticketStatuses[0]}</option>
            <option value={ticketStatuses[1]}>{ticketStatuses[1]}</option>
            <option value={ticketStatuses[2]}>{ticketStatuses[2]}</option>
          </select>
          <p>Description: {ticket.description}</p>
          <textarea
          placeholder='Write Response'
            id="description"
            name="description"
            value={responseMessage}
            style={{height: 100, width: 350}}
            required
            onChange={handleResponseChange}
          />
        <button disabled={responseMessage.length===0} type="submit" onClick={handleResponseSubmission}>Submit</button>
        {messageSubmitted && <p style={{color: 'green'}}>Response Submitted Successfully</p>}
        {errorSubmitting && <p style={{color: 'red'}}>Error Submitting</p>}
          </div>: <p>Error getting this ticket</p>}
    </div> 
  );
};

export default TicketPage;