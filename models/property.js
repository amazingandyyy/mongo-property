'use strict';

var mongoose = require('mongoose');

var propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    oStatus: {
        type: String,
        required: true,
        enum: ['available', 'occupied'],
        default: 'available'
    },
    rPrice: {
        type: Number,
        min: 1,
        required: true
    },
    uCost: {
        type: Number,
        min: 0,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        require: true
    },
    clients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }]
});
var Property = mongoose.model('Property', propertySchema);



module.exports = Property;
