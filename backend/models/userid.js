const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userInfo = new Schema ({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    cityName:{
        type:String
    },

    cityLocation:{
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number]
       }
    }
})

const User = mongoose.model('User', userInfo)

module.exports = User