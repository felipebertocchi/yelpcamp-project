const { Schema, model } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true })

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    errorMessages: {
        UserExistsError: 'A user with the given email is already registered'
    }
});

module.exports = model('User', UserSchema);