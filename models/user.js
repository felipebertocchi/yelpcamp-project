const { Schema, model } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    }
})

UserSchema.plugin(passportLocalMongoose); // this will add username and password field w/ additional methods

module.exports = model('User', UserSchema);