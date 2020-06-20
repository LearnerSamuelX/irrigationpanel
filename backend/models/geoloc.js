const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoLoc = new Schema ({
    name:{
        type:String
    },

    location:{
        type: { type: String },
        coordinates: [Number]
    }
})

const cityloc = mongoose.model('GeoLoc', GeoLoc)
module.exports = cityloc