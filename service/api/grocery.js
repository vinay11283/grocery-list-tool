//Import the mongoose module
var mongoose = require('mongoose');
var Grocery = require('../models/grocery');
var config = require('../config');

//Get the default connection
//var mongoDb = mongoose.createConnection(config.mongodbUri);
var mongoDb = mongoose.connect(config.mongodbUri, function(err) {
    if (err) {
        console.err(err);
    } else {
        console.log('Connected');
    }
});

//Bind connection to error event (to get notification of connection errors)
//mongoDb.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Get list of groceries
exports.list = function(req, res) {

    if (mongoDb) {
        Grocery.find({}, function(err, groceries) {
            if (err) throw err;

            // object of all the groceries
            console.log(groceries);
            res.send(groceries);
        });
    } else {
        config.logStars('No database object!');
        res.status(404).send({});
    }
};

//Get Grocery by Id.
exports.getById = function(req, res) {
    var id = req.params.id;
    if (mongoDb) {
        Grocery.findOne({
            _id: id
        }, function(err, grocery) {
            if (err) throw err;
            res.send(grocery);
        });
    } else {
        config.logStars('No database object!');
        res.status(404).send({});
    }
};

// Creates a new grocery item in datastore.
exports.create = function(req, res) {
    console.log(req.body.first_name);
    var grocery = new Grocery(req.body);

    console.log(mongoose.connection.readyState);
    if (mongoDb) {
        console.log('Adding grocery item: ' + JSON.stringify(grocery));
        //Initialize the new item as not completed.
        grocery.completed_indicator = false;
        grocery.save(function(err) {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                console.log('Success: ' + JSON.stringify(grocery));
                res.send(grocery);
            }
        });
    } else {
        console.log('No database object!');
    }

};

exports.update = function(req, res) {

    var id = req.params.id;
    // get a grocery item with ID.
    Grocery.findById(id, function(err, grocery) {
        if (err) throw err;
        console.log('Grocery Found - ' + JSON.stringify(grocery));
        grocery.title = req.body.title;
        grocery.notes = req.body.notes;
        grocery.completed_indicator = req.body.completed_indicator;

        // save the grocery item.
        grocery.save(function(err) {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                console.log('Success: ' + JSON.stringify(grocery));
                res.send(grocery);
            }
        });

    });

};
// delete an existing grocery  itenin datastore.
exports.delete = function(req, res) {

    var id = req.params.id;
    console.log('Deleting grocery item: ' + id);
    Grocery.findByIdAndRemove(id, function(err) {
        if (err) throw err;
        console.log('Grocery item deleted!');
        res.status(200).send();

    });

};
