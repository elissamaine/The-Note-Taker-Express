const express = require('express');
const path = require('path');
const fs = require('fs');
// Helper method for generating unique ids (idk which one to use come back to this)
const uuid = require('./helpers/uuid');
const { v4: uuidv4 } = require('uuid');


const app = express();

const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set a static folder 
app.use(express.static(path.join(__dirname, 'public')));

//HTML ROUTES
app.get('/', (req, res) => {
  
});

app.get('/notes', (req, res) => {

});


//API ROUTES 
app.get('/api/notes', (req, res) => {

});

app.post('/api/notes', (req, res) => {

});

app.delete('/api/notes/:id', (req, res) => {

});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
