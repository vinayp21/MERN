import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    name:{
      type: String,
      required: true
    },
    password: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: false
    },
    team: {
        type: String,
        required: false
    },
    image:{
      type: String,
    },
    isAdmin:{
      type: Boolean,
      required: true
    }
});

module.exports = mongoose.model('User',UserSchema);
