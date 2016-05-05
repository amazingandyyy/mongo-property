'use strict';

var express = require('express');
var router = express.Router();
var Property = require('../models/property')

router.get('/', (req, res) => {

    // console.log("gettt req.query: ", req.query);
    // console.log("gettt req.query.limit: ", req.query.limit);
    // console.log("gettt req.query.sort: ", req.query.sort);

    //
    // var limit = parseInt(req.query.limit);
    // var sort = req.query.sort;
    // delete req.query.limit;
    //
    // console.log('aa limit: ', limit);
    // console.log('aa sort: ', sort);

    Property
        .find({})
        // .limit(limit)
        // .sort(sort)
        .populate('clients')
        .exec((err, clients) => {
            res.status(err ? 400 : 200).send(err || clients);
        });
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
    // [{
    //     $match: {
    //         $or: [{
    //             'rPrice': {
    //                 $gt: rPriceMin,
    //                 $lt: rPriceMax
    //             }
    //         }, {
    //             'uCost': {
    //                 $lt: uCostMax,
    //                 $gt: uCostMin
    //             }
    //         }]
    //     }
    // }]
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
