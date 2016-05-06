'use strict';

var mongoose = require('mongoose');
// var Client = require('../models/client');


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


propertySchema.statics.addClient = function(propertyId, clientId, cb) {
    console.log('start to add client ', propertyId);
    console.log('propertyId: ', propertyId);
    console.log('clientId: ', clientId);
    Property.findById(propertyId, (err1, property) => {
        // console.log('Clientttttt: ', Client);
        mongoose.model('Client').findById(clientId, (err2, client) => {
            console.log('err1: ', err1);
            console.log('err2: ', err2);
            if (err1 || err2) return cb(err1 || err2);

            console.log('propertyy: ', property);
            console.log('clientt: ', client);
            var clientHasProperty = client.properties.indexOf(property._id) !== -1;
            var propertyHasClient = property.clients.indexOf(client._id) !== -1;
            if (clientHasProperty || propertyHasClient) {
                return cb();
            }
            console.log('propertyyyy: ', property);
            client.properties.push(property._id);
            console.log('client: ', client);
            property.clients.push(client._id);
            console.log('property: ', property);
            property.save((err1) => {
                client.save((err2) => {
                    cb(err1 || err2)
                });
            });
        });
    });
};

propertySchema.statics.removeClient = function(propertyId, clientId, cb) {
    console.log(propertyId);

    Property.findById(propertyId, (err1, property) => {
        mongoose.model('Client').findById(clientId, (err2, client) => {
            console.log('err1: ', err1);
            console.log('err2: ', err2);
            if (err1 || err2) return cb(err1 || err2);

            console.log('property: ', property);
            console.log('client: ', client);
            var index1 = property.clients.indexOf(client._id);
            var index2 = client.properties.indexOf(property._id);
            property.clients.splice(index1, 1);
            client.properties.splice(index1, 1);
            property.save((err1) => {
                client.save((err2) => {
                    cb(err1 || err2)
                });
            });
        });
    });
}


var Property = mongoose.model('Property', propertySchema);

module.exports = Property;
