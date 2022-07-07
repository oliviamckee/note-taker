const express = require('express');
const notes = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();

// api routes 
// GET /api/notes should read the db.json file and return all saved notes as json
// POST /api/notes should recieve a new note to save on the request body, add it ot the db, json file, then return the new note to the client 
// find a way to give each note a unique id when it's saved (look into npm packages that could do this)
app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

// html routes 
// GET /notes should return the notes.html file
// GET * should return the index.html file

app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
  });