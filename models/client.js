'use strict';

var mongoose = require('mongoose');
var Property = require('./property');


var clientSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    properties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    }]
});

clientSchema.statics.addProperty = function(clientId, propertyId, cb) {
    console.log(propertyId);
    Client.findById(clientId, (err1, client) => {
        Property.findOne({_id: propertyId}, (err2, property) => {
            console.log('err1: ', err1);
            console.log('err2: ', err2);
            if (err1 || err2) return cb(err1 || err2);

            console.log('client: ' ,client);
            console.log('property: ' ,property);
            var clientHasProperty = client.properties.indexOf(property._id) !== -1;
            var propertyHasClient = property.clients.indexOf(client._id) !== -1;
            // if(clientHasProperty || propertyHasClient){
            //     return cb();
            // }
            console.log('propertyyyy: ', property);
            client.properties.push(property._id);
            console.log('client: ', client);
            property.clients.push(client._id);
            console.log('property: ', property);
            // property.createdAt = new Date(property.createdAt)
            client.save((err1) => {
                property.save((err2) => {
                    cb(err1 || err2)
                });
            });

        });
    });
};

clientSchema.statics.removeProperty = function(clientId, propertyId, cb) {
    console.log(propertyId);
    Client.findById(clientId, (err1, client) => {
        Property.findOne({_id: propertyId}, (err2, property) => {
            console.log('err1: ', err1);
            console.log('err2: ', err2);
            if (err1 || err2) return cb(err1 || err2);

            console.log('client: ' ,client);
            console.log('property: ' ,property);
            // var clientHasProperty = client.properties.indexOf(property._id) !== -1;
            // var propertyHasClient = property.clients.indexOf(client._id) !== -1;
            // if(clientHasProperty || propertyHasClient){
            //     return cb();
            // }
            var index1 = client.properties.indexOf(property._id);
            var index2 = property.clients.indexOf(client._id);
            console.log('index1: ', index1);
            console.log('index2: ', index2);
            console.log('propertyyyy: ', property);
            client.properties.splice(index1,1);
            // console.log('client: ', client);
            property.clients.splice(index2,1);
            // console.log('property: ', property);
            // property.createdAt = new Date(property.createdAt)
            client.save((err1) => {
                property.save((err2) => {
                    cb(err1 || err2)
                });
            });
        });
    });
};



var Client = mongoose.model('Client', clientSchema);

module.exports = Client;
