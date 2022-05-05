const express = require('express');
const pageRoutes = require('./routes/pageRoutes');
const apiRoutes = require('./routes/apiRoutes');


const PORT = 3001;

const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', pageRoutes);



app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);