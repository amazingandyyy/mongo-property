'use strict';

var mongoose = require('mongoose');

var propertySchema = new mongoose.Schema({
    address: String,
    oStatus: String,
    rPrice: Number,
    uCost: Number,
    zip: { type: Number, min: 10000, max: 99999 },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
var Property = mongoose.model('Property', propertySchema);

module.exports = Property;
