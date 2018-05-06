'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    name: {
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
    image: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
});

module.exports = _mongoose2.default.model('User', UserSchema);