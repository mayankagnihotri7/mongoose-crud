//requires.
const express = require('express');
const mongoose = require('mongoose');

// require router files
const indexRouter = require('./routes/index');
const userRouter = require('./routes/userRouter');

//connect to db.
mongoose.connect('mongodb://localhost/mongoose-crud', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    console.log('connected', err ? err : true);
})

//instanstiate express app.
const app = express();

// middlewares required
app.use(express.json()); //handle json data.
app.use(express.urlencoded({extended: false}));

// setup view engine
app.set('view engine', 'ejs'); //use ejs.
app.set('views', __dirname + '/views'); //directory to serve all templates.

// routing middlewares

app.use('/', indexRouter);
app.use('/user', userRouter);

// b. client or server error
app.use((err,req,res, next) => {
if(err.name === 'ValidationError') {
    res.statusCode = 400;
    res.json({err: err.message});
}
if(err.name === 'MongoError'){
    res.status(400).json({err: err.message});
}
})

// listeners
app.listen(5029, () => console.log('Server on 5030 is running good'));

// Conventions:
// Create a resource
//GET => '/articles/new'
// POST => '/articles'