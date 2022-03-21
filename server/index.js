// imports
const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('./config');

// init
const app = express();

// middlewares
app.use(express.json()); // req.body
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
})); // enable cors
app.use(session({
    secret: "secret",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
    }
})); // req.session

app.use('/user', require('./routes/user'));
// app.use('/shows', require('./routes/shows'))
app.use('/admin', require('./routes/admin'));
app.use('/vacations', require('./routes/vacations'));

// run
app.listen(1000, () => console.log("server up and running on port 1000"));