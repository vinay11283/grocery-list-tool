var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var grocerySchema = new Schema({
	title: { type: String, required: true },
	notes: { type: String, required: false }, // Notes is optional.
	completed_indicator: { type: Boolean, required: true }
});

// the schema is useless so far
// we need to create a model using it
var Grocery = mongoose.model('Grocery', grocerySchema);

// make this available to our users in our Node applications
module.exports = Grocery;
