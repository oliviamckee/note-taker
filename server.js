const express = require('express');
const { notes } = require('./db/db.json');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return body;
}

// api routes 
    // GET /api/notes should read the db.json file and return all saved notes as json
app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

    // POST /api/notes should receive a new note to save on the request body, add it to the db, json file, then return the new note to the client 
    // find a way to give each note a unique id when it's saved (look into npm packages that could do this) ... or copy module.... ??? 
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const note = createNewNote(req.body, notes)
    res.json(note);
});

// html routes 
    // GET /notes should return the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
    // GET * should return the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
});