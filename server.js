const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();

  var log = (`${now}: ${req.method} ${req.url}`);
  console.log(log);
  fs.appendFile('sever.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to connect to sever');
    }
  })
  next();
});

//maintenance page
// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Work page'
//   })
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
app.get('/', (req, res) => {
  //res.send('<h1>Hello Express</h1>');
  res.render('homePage.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello and welcome to home page',
    headTitle: 'This is the head title'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to connect'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    titlePage: 'Check check 1, 2',
    welcomeMessage: 'Welcome Message'
  })
})

app.listen(port, () => {
  console.log(`server up on ${port}...`);
});
