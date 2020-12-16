const express = require('express');
const app = express();
const PORT = 3000;

// setting the templating engine on the app. This tells Express which to use.
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home.ejs'); // doesn't need the .ejs extension, since we specified it in the set() method.
});

app.listen(PORT, () => console.log('listening on port ' + PORT));
