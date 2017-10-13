const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;


let app = express();

hbs.registerPartials(`${__dirname}/views/partials`);

app.set('view engine','hbs');

// use static middleware
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.error('Unable to append servder log!', err);
        }
    });
    next();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home page',
        currentYearOld: new Date().getFullYear(),
        welcomeMessage: 'Zdravoooo!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'O nama',
        currentYearOld: new Date().getFullYear()
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        projects: []
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Something went wrong'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});