const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cityinradar = new Schema ({
    name:{
        type:String
    },

    location:{
        type: { type: String },
        coordinates: [Number]
    },

    weather:{
        type:String
    }
})

const poolingcities = mongoose.model('cityinradar', cityinradar)
module.exports = poolingcities