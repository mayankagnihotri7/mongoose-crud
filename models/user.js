let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /@/
    },
    age: Number,
    sports: [String]
},{timestamps: true});

// Create model.
let User = mongoose.model('User', userSchema);

// Export model.
module.exports = User;