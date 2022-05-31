const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


// create schema for db
const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: [],
    comments: [
        // tells db to expect an objectid 
        //and that the data comes from comment model
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]

},
    // allows the use of virtuals in this schema
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }

);

// get tool count of comments and replies on retrieval




// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;