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

//post request for the new note to be added to the db.json data
app.post('/api/notes', (req, res) => {
  console.log(req.body);

  //this creates a constant for the users imput on the submitted form
  const { title, text } = req.body;

  //this creates a newNote constant that will take the inputs and add them to an object
  const newNote = {
    "title": title,
    "text": text,
    "id": uuidv4()
  };

  // id there is user input then it pushed the newNote object into the db.json file
  if (req.body) {
    readAndAppend(newNote, './db/db.json');
  } else {
    res.error('Error in adding a new note');
  }
});

//delete request
app.delete('/api/notes/:id', (req, res) => {
  //noteId constatnt is the id of the object that the user is trying to delete
  const noteId = req.params.id;

  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      
      //creates a new array without the object with noteId id
      const result = json.filter((note) => note.id != noteId);

      //pushed the new array of objects (without the deteted note to the)
      writeToFile('./db/db.json', result);

      res.json(`item ${noteId} has been deleted 🗑️`);
    })
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
