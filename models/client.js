'use strict';

var mongoose = require('mongoose');

var clientSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
var Client = mongoose.model('Client', clientSchema);

module.exports = Client;
