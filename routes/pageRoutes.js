const router = require('express').Router();
const path = require('path');

//Serves the notes page
router.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../public/notes.html')));

//Serves the homepage if no other match is made
router.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

//Export the router so server.js can make use of it
module.exports = router;