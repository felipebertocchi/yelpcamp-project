const { Schema, model } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String
    },
}, { timestamps: true })

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    usernameQueryFields: ['email'],
    errorMessages: {
        UserExistsError: 'A user with the given email is already registered',
        IncorrectPasswordError: 'Password is incorrect',
        IncorrectUsernameError: 'Email is not registered',
    }
});

module.exports = model('User', UserSchema);