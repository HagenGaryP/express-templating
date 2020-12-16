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

// route for random response
// note: Create a template for this, random.ejs, inside of views folder.
app.get('/rand', (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  // res.render('random');
  // the render method takes a 2nd argument which is an object of key-value pairs.
  res.render('random', { rand: num });
  // now the value of 'num' will be available in the template under the key named "rand".
})


// subreddit route and template
app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params;
  res.render('subreddit', { subreddit });
})


// loops example, using /cats route
app.get('/cats', (req, res) => {
  const cats = ['Blue', 'Rocket', 'Monty', 'Winston'];

  res.render('cats', { cats });
})

app.listen(PORT, () => console.log('listening on port ' + PORT));
