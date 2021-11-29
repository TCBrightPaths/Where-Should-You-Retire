const express = require('express');
const cors = require('cors');
const app = express();



app.use(express.json());
app.use(cors());

const { getLocations, calcRetireIncome, updateItinerary, deleteItinerary } = require('./controller.js');

//app.post('/api/locations', seed);

app.get('/api/locations', getLocations);
app.post('/api/locations', calcRetireIncome);
app.put('/api/locations', updateItinerary)
app.delete('/api/locations', deleteItinerary)


const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));