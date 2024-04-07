const {Client} = require('pg');

//populate dbClient with the proper values
const dbClient = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "secret",
    database: "helpdeskdatabase"
})
  
dbClient.connect();
  

async function getTickets() {
    const query = await dbClient.query('SELECT * FROM Tickets;')
    return query.rows;
}

async function getTicket(id) {
    const query = 'SELECT * FROM Tickets WHERE id= '+ id
    const queryResult = await dbClient.query(query);
    return queryResult.rows;
}

async function deleteTicket(id) {
    const query = 'DELETE FROM Tickets WHERE id= '+ id
    const queryResult = await dbClient.query(query);
    return queryResult.rows;
}

async function createTicket(ticket) {
    const valuesString = '\'' + ticket["reporterName"]+ '\', \''+ ticket["reporterEmail"]+ '\', \''+ ticket["description"]+ '\', \'new\''
    const query = 'INSERT INTO Tickets (reporterName, reporterEmail, description, status) VALUES ('+ valuesString+ ')'
    const queryResult = await dbClient.query(query)
    return query.rows;
}

async function updateTicketStatus( id, newStatus) {
    const query = 'UPDATE Tickets SET status=\''+ newStatus+ '\' WHERE id= '+ id
    await dbClient.query(query)
}

module.exports = {getTickets, getTicket, updateTicketStatus, createTicket, deleteTicket}