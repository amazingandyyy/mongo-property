'use strict';

var mongoose = require('mongoose');

var propertySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    oStatus: {
        type: String,
        require: true,
        enum: ['available', 'occupied'],
        default: 'available'
    },
    rPrice: {
        type: Number,
        min: 1,
        require: true
    },
    uCost: {
        type: Number,
        min: 0,
        require: true
    },
    zip: {
        type: Number,
        min: 10000,
        max: 99999,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        require: true
    }
});
var Property = mongoose.model('Property', propertySchema);

module.exports = Property;
