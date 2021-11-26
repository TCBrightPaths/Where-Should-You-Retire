const express = require('express');
const cors = require('cors');
const app = express();

const {SERVER_PORT} = process.env

app.use(express.json());
app.use(cors());

const { getLocations, calcRetireIncome } = require('./controller.js');

app.get(`/api/cities`, getLocations);
app.post(`/api/cities`, calcRetireIncome);


app.listen(SERVER_PORT, () => console.log(`Server is running on port ${SERVER_PORT}`));