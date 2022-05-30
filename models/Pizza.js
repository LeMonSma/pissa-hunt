const { Schema, model } = require('mongoose');


// create schema for db
const pizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createBy: {
        type: String
    },
    createdAT: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: []
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', pizzaSchema);

// export the Pizza model
module.exports = Pizza;