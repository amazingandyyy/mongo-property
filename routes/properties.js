'use strict';

var express = require('express');
var router = express.Router();
var Property = require('../models/property')

router.get('/', (req, res) => {
    Property
        .find({})
        .populate('clients')
        .exec((err, properties) => {
            res.status(err ? 400 : 200).send(err || properties);
        });
});

router.get('/:id', (req, res) => {
    console.log('req.params: ', req.params);
    var propertyId = req.params.id;
    console.log('propertyIdddd: ', propertyId);
    Property.findById(propertyId, (err, property) => {
        if (err) return res.status(400).send('errr: ', err);
        console.log('userrrrr: ', property);
        res.send(property);
    }).populate('clients');
});

router.get('/find', (req, res) => {

    console.log("gettt req.query: ", req.query);

    var find = req.query; // it's an array
    var rPriceMin = parseInt(req.query.rPriceMin); // it's an array
    var rPriceMax = parseInt(req.query.rPriceMax); // it's an array
    var uCostMin = parseInt(req.query.uCostMin); // it's an array
    var uCostMax = parseInt(req.query.uCostMax); // it's an array
    // delete req.query.limit;

    console.log('aa find: ', find);
    console.log('aa rPriceMin: ', rPriceMin);
    console.log('aa rPriceMax: ', rPriceMax);
    console.log('aa uCostMin: ', uCostMin);
    console.log('aa uCostMax: ', uCostMax);

    Property
        .find({
            'rPrice': {
                $lte: rPriceMax,
                $gte: rPriceMin
            },
            'uCost': {
                $lte: uCostMax,
                $gte: uCostMin
            }
        })
        .sort({
            'rPrice': -1
        })
        .exec((err, properties) => {
            res.status(err ? 400 : 200).send(err || properties);
        });
});

router.route('/:propertyId/addClient/:clientId')
    .put((req, res) => {
        var propertyId = req.params.propertyId;
        var clientId = req.params.clientId;
        console.log('propertyIdd: ', propertyId);
        console.log('clientIdd: ', clientId);
        Properties.addClient(propertyId, clientId, err => {
            res.status(err ? 400 : 200).send(err)
        });
    })
    .delete((req, res) => {
        var propertyId = req.params.propertyId;
        var clientId = req.params.clientId;
        console.log('propertyId: ', propertyId);
        console.log('clientId: ', clientId);
        Properties.removeClient(propertyId, clientId, err => {
            res.status(err ? 400 : 200).send(err)
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
    Property.find({
        cate: category
    }, (err, properties) => {
        if (err) return res.status(400).send('errr: ', err);
        res.send(properties);
    })
});
router.put('/:id', (req, res) => {
    var propertyId = req.params.id;
    var updateInfo = req.body;
    Property.findByIdAndUpdate(propertyId, {
        $set: updateInfo
    }, (err, property) => {
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
