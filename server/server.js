const express = require('express');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());

const { getHouses, calcRetireIncome } = require('./controller.js');

app.get(`/api/houses`, getHouses);
app.post(`/api/houses`, calcRetireIncome);
//app.put(`/api/houses/:id`, updateHouse);
//app.delete(`/api/houses/:id`, deleteHouse);

app.listen(4004, () => console.log(`Server is running on port 4004`));