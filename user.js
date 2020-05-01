let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    email: {
        type: String,
        lowercase: true
    },
    age: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        unique: true,
        required: true,
        minlength: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    favourites: ['Chicken','Fish','Spagetti']
},{timestamps:true});

module.exports = mongoose.model('User',userSchema);