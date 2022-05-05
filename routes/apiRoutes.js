const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
const util = require('util');

const promiseReadFile = util.promisify(fs.readFile);
const promiseWriteFile = util.promisify(fs.writeFile);

//Reads notes from the db.json
router.get("/notes", async (req, res) => {
  notes = await getNotes()
  console.log(notes);
  return res.json(notes);
});

//Writes a note to the db.json, then returns the new note to the client
router.post("/notes", async (req, res) => {
  const { title, text } = req.body;

  //Ensure the note isn't blank. Looks like the html should handle this but just to be safe
  if (!title) {
    throw new Error("Please provide a valid title for your note.");
  }
  if (!text) {
    throw new Error("Please provide a valid text content for your note");
  }

  //Use uuid to generate a unique id
  const newNote = {title, text, id: uuid() };

  const notes = await getNotes()
  const notesArray = [...notes, newNote];
  promiseWriteFile('./db/db.json', JSON.stringify(notesArray));

  return res.json(newNote);
});

//Handles deleting a note
router.delete("/notes/:id", async (req, res) => {
    const notesArray = await getNotes();
    const filteredArray = notesArray.filter(note => note.id != req.params.id);
    promiseWriteFile('./db/db.json', JSON.stringify(filteredArray));
    return res.json(filteredArray);
})

//Helper function to get notes from the database
async function getNotes() {
  const notes = await promiseReadFile('./db/db.json')
    let parsedNotes;
    //Check if we have an array. If not, return empty array
    try {
      parsedNotes = [].concat(JSON.parse(notes));
    } catch (err) {
      parsedNotes = [];
    }
    return parsedNotes;
  
}

module.exports = router;
