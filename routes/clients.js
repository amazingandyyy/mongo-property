'use strict';

var express = require('express');
var router = express.Router();
var Client = require('../models/client')

router.get('/', (err, res) => {
    Client.find({}, (err, clients) => {
        if (err) return res.status(400).send('errr: ', err);
        console.log(clients);
        res.send(clients); // always give me an array
    });
});
router.post('/', (req, res) => {
    var newClient = new Client(req.body);
    newClient.save((err, client) => {
        if (err) return res.status(400).send('errr: ', err);
        res.send(client);
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
    Client.find({cate: category}, (err, clients)=>{
        if (err) return res.status(400).send('errr: ', err);
        res.send(clients);
    })
});
router.put('/:id', (req, res) => {
    var clientId = req.params.id;
    var updateInfo = req.body;
    Client.findByIdAndUpdate(clientId, {$set: updateInfo}, (err, client) => {
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
