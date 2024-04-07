const express = require('express');
const cors = require('cors');
const {Client} = require('pg');
const { getTickets, getTicket, updateTicketStatus, createTicket, deleteTicket } = require('./db/dbQueries');
const bodyParser = require('body-parser')

const dbClient = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "secret",
  database: "helpdeskdatabase"
})

dbClient.connect();

const PORT = 3001;

const app = express();

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get('/api/tickets', async (req, res) => {
  const tickets = await getTickets();
  res.json({tickets: tickets})
})

app.get('/api/tickets/:id', async (req, res) => {
  const ticket = await getTicket(req.params.id);
    res.json({ticket: ticket})
})

app.delete('/api/tickets/:id', async (req, res) => {
  const ticket = await deleteTicket(req.params.id);
  res.status(200).send({
    success: true
  });
})

app.post('/api/tickets', async (req, res) => {
  createTicket(req.body).then(() => {
  res.status(200).send({
    success: true
  });
  }).catch(() => {
    console.log('error occured');
  })
})
app.post('/api/tickets/:id/submitResponse', async (req, res) => {
  console.log('Would normally send email here with body: …', req.body.responseMessage);
  res.status(200).send({
    success: true
  });
})

app.put('/api/tickets/status/:id', async (req, res) => {
  await updateTicketStatus(req.params.id, req.body.newStatus);
  res.status(200).json({
    success: true
  });
})

app.listen(PORT, () => {
    console.log('server is now listening on port', PORT);
})