const express = require('express');
//hbs = handlebarsjs.com
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

//the following allows partial html templates
hbs.registerPartials(__dirname + '/views/partials')
//the following tells express what view engine to use.
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  //console.log(`${now}: ${req.method} ${req.url}`);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  });
  //need to call next(); or it will hang
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance',
//     welcomeMessage: 'Undergoing maintenance.  We will be back soon.'
//   });
// });

// app.get('/maintenance', (req, res) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance',
//     welcomeMessage: 'Undergoing maintenance.  We will be back soon.'
//   });
// });

//the following sets up a static directory for web
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
  //return 'test';
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express</h1>');
  // res.send({
  //   name: 'Me',
  //   likes: ['Apple', 'Dog']
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to Some Website.',
  });
});

app.get('/about', (req, res) => {
  //res.send('About page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
