'use strict';

var express = require('express');
var router = express.Router();
var Client = require('../models/client')

router.get('/', (err, res) => {
    Client
        .find({})
        .populate('properties')
        .exec((err, clients) => {
            if (err) return res.status(400).send('errr: ', err);
            console.log(clients);
            res.send(clients); // always give me an array
        })
});
router.get('/:id', (req, res) => {
    console.log('req.params: ', req.params);
    var clientId = req.params.id;
    console.log('clientIdddd: ', clientId);
    Client.findById(clientId, (err, user) => {
        if (err) return res.status(400).send('errr: ', err);
        console.log('userrrrr: ', user);
        res.send(user);
    }).populate('properties');
});

router.post('/', (req, res) => {
    var newClient = new Client(req.body);
    newClient.save((err, client) => {
        if (err) return res.status(400).send('errr: ', err);
        res.send(client);
    });
});

router.route('/:clientId/addProperty/:propertyId')
    .put((req, res) => {
        var clientId = req.params.clientId;
        var propertyId = req.params.propertyId;
        console.log('clientId: ', clientId);
        console.log('propertyId: ', propertyId);
        Client.addProperty(clientId, propertyId, err => {
            res.status(err ? 400 : 200).send(err)
        });
    })
    .delete((req, res) => {
        var clientId = req.params.clientId;
        var propertyId = req.params.propertyId;
        console.log('clientId: ', clientId);
        console.log('propertyId: ', propertyId);
        Client.removeProperty(clientId, propertyId, err => {
            res.status(err ? 400 : 200).send(err)
        });
    });

router.delete('/:id', (req, res) => {
    var clientId = req.params.id;
    Client.findByIdAndRemove(clientId, (err) => {
        if (err) return res.status(400).send('errr: ', err);
        res.send(); // always give me an object
    });
});
router.get('/:category', (req, res) => {
    var category = req.params.category;
    console.log('category: ', category);
    Client.find({
        cate: category
    }, (err, clients) => {
        if (err) return res.status(400).send('errr: ', err);
        res.send(clients);
    })
});
router.put('/:id', (req, res) => {
    var clientId = req.params.id;
    var updateInfo = req.body;
    Client.findByIdAndUpdate(clientId, {
        $set: updateInfo
    }, (err, client) => {
        if (err) return res.status(400).send('errr: ', err);
        res.send(client); // always give me an object
    });
});
router.delete('/', (req, res) => {
    Client.remove({}, (err, clients) => {
        if (err) return res.status(400).send('errr: ', err);
        res.send(clients); // always give me an array
    });
});

module.exports = router;
