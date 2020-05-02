let express = require('express');
let userRouter = express.Router();

// require user model
const User = require('../models/user');

//routes.
// a. create user.
userRouter.post('/new', (req, res, next) => {
    // grab body data.
    console.log(req.body, 'empty body');

    // save the data to db.
    // model.create
    User.create(req.body, (err, data) => {
        if (err) return next(err);
        // console.log(req,body,data);
        // sending response to client
        // res.send('User Created Successfully!');
        res.redirect('/user');
    })

    // send a response to client.
})

// Rendering Form
userRouter.get('/new', (req,res,next) => {
    res.render('createUserForm');
})

// b. list all users from database.
userRouter.get('/', (req, res,next) => {
    User.find({}, (err, listUsers) => {
        if (err) return next(err);
        res.render('users', {users: listUsers});
    });
})

// c. get a single user from db.
userRouter.get('/:email', (req, res, next) => {
    let email = req.params.email;
    User.findOne({email}, (err, user) => {
        if (err) return next(err);
        res.render('userDetails', {user});
    })
})

// d. update single user.
userRouter.get('/:id/edit', (req, res, next) => {
    let id = req.params.id;
    User.findById(id, (err, user) => {
        if (err) return next(err);
        res.render('updatePage', { user });
    })
})

userRouter.post('/:id', (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedUser) => {
        if (err) return next(err);
        res.redirect('/user');
    })
})

// e. delete user.
userRouter.get('/:id/delete', (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, deletedDocument) => {
        if (err) return err;
        res.redirect('/user');
    })
})

//error handler middlewares
// a. 404
userRouter.use((req, res, next) => {
    // res.statusCode = 404;
    // res.send('Page not found');
    res.status(404).send('Page Not Found');
})

module.exports = userRouter;