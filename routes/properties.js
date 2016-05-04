'use strict';

var express = require('express');
var router = express.Router();
var Property = require('../models/property')

router.get('/', (err, res) => {
    Property.find({}, (err, properties) => {
        if (err) return res.status(400).send('errr: ', err);
        console.log(properties);
        res.send(properties); // always give me an array
    });
});
router.post('/', (req, res) => {
    var newProperty = new Property(req.body);
    newProperty.save((err, property) => {
        if (err) return res.status(400).send('errr: ', err);
        res.send(property);
    });
});
router.delete('/:id', (req, res) => {
    var propertyId = req.params.id;
    Property.findByIdAndRemove(propertyId, (err) => {
        if (err) return res.status(400).send('errr: ', err);
        res.send(); // always give me an object
    });
});
router.get('/:category', (req, res) => {
    var category = req.params.category;
    console.log('category: ', category);
    Property.find({cate: category}, (err, properties)=>{
        if (err) return res.status(400).send('errr: ', err);
        res.send(properties);
    })
});
router.put('/:id', (req, res) => {
    var propertyId = req.params.id;
    var updateInfo = req.body;
    Property.findByIdAndUpdate(propertyId, {$set: updateInfo}, (err, property) => {
        if (err) return res.status(400).send('errr: ', err);
        res.send(property); // always give me an object
    });
});

router.delete('/', (req, res) => {
    Property.remove({}, (err, properties) => {
        if (err) return res.status(400).send('errr: ', err);
        res.send(properties); // always give me an array
    });
});

module.exports = router;
