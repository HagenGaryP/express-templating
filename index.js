const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

// setting the templating engine on the app. This tells Express which to use.
app.set('view engine', 'ejs');

// Joining the current directory, where this file is located, with the path to the views directory.
app.set('views', path.join(__dirname, '/views')); // doesn't have to be views. Could be public or anything.

app.get('/', (req, res) => {
  res.render('home.ejs'); // doesn't need the .ejs extension, since we specified it in the set() method.
});

app.listen(PORT, () => console.log('listening on port ' + PORT));
