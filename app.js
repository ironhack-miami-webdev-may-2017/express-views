const express = require('express');
const expressLayouts = require('express-ejs-layouts');


const app = express();

// imports the ejs package and allows us to use separate view files
app.set('view engine', 'ejs');

// tells Express that our view files are in the "pages/" folder
// (the default folder name is "views/")
app.set('views', 'pages');

// hosts all the files inside the "public/" folder from localhost:3000
app.use(express.static('public'));

// tells Express that we want to use the EJS layouts package
app.use(expressLayouts);

// tells Express that our layout file is "pages/my-master-layout.ejs"
app.set('layout', 'my-master-layout.ejs');
    // defaults to "pages/layout.ejs"


// DEFAULT VALUES FOR VIEW VARIABLES ☟☟☟ -------------------------------------
app.locals.myTitle = 'Express Views';
// <title> <%= myTitle %> </title>


app.locals.myBodyClass = '';
// <body class="<%= myBodyClass %>">
// -----------------------------------------------------------------------------



// ROUTES GO HERE ☟☟☟ --------------------------------------------------------

  //      request  response
  //           |    |
app.get('/', (req, res, next) => {
  const myName = 'Nizar';
  const age = 30;

  // send pages/home-view.ejs to the browser
  res.render(
    'home-view.ejs',        // 1st arg -> name of view file

    {                       // 2nd arg -> object to transfer variables to the view
      viewNameVar: myName,  // |
      viewAge: age          // |
    }                       // |
  );
});


const booksList = [
  'Dune',
  'Lord of the Rings',
  'Harry Potter',
  'The Martian',
  'Elon Musk uhh... I forgot the rest of it',
  'Necronomicon',
  'Eloquent JavaScript'
];

//             request  response
//                  |    |
app.get('/books', (req, res, next) => {
// send pages/books-view.ejs to the browser
  res.render('books-view.ejs', {
    booksForView: booksList
  });
});



const accomplishmentsList = [
  { award: 'Best TA 21 and under', type: 'performance', person: 'Kevin' },
  { award: 'Coolest Swiss Person in Class', type: 'personality', person: 'Daniel K.' },
  { award: 'Most Slices of Pizza Eaten', type: 'strength', person: 'Nik E.' },
  { award: 'Most Beautiful Former Cook', type: 'looks', person: 'Josh' },
  { award: 'Best Last Name', type: 'name', person: 'Darren' }
];

app.get('/accomplishments', (req, res, next) => {
  const randomIndex = Math.floor(Math.random() * accomplishmentsList.length);

  res.render('accomplishments-view.ejs', {
    accomplishmentsForView: accomplishmentsList,
    featuredAccomplishment: accomplishmentsList[randomIndex],
    myTitle: 'Accomplishments - Express Views'
      // OPTIONAL: the myTitle variable in the layout is optional
  });
});
// -----------------------------------------------------------------------------



app.listen(3000);
