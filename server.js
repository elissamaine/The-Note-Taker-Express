const express = require('express');
const path = require('path');
const fs = require('fs');
//helpers for reading and writing a file these helper functions were from the mini-project
const { readAndAppend, readFromFile, writeToFile  } = require('./helpers/helpers')
// Helper method for generating unique ids (idk which one to use come back to this)
const { v4: uuidv4 } = require('uuid');


const app = express();

const PORT = process.env.PORT || 3001;

//middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set a static folder 
app.use(express.static(path.join(__dirname, 'public')));

//HTML ROUTES
//get request for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

//get request for the notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});


//API ROUTES 
//get request for the json data in the db folder 
app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'))
});

app.post('/api/notes', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  const newNote = {
    "title": title,
    "text": text,
    "id": uuidv4()
  };

  if (req.body) {
    readAndAppend(newNote, './db/db.json');
  } else {
    res.error('Error in adding a new note');
  }
});

//app.delete('/api/notes/:id', (req, res) => {

//});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
