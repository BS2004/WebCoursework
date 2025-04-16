const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

const publicRoutes = require('./routes/publicRoutes');
const organiserRoutes = require('./routes/organiserRoutes');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({ secret: 'secret123', resave: false, saveUninitialized: true }));

app.use('/', publicRoutes);
app.use('/organiser', organiserRoutes);

app.listen(3000, () => console.log(`Server running on port 3000, click ctrl^c to stop the program.`));