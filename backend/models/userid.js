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

    countryCode:{
        type:String
    }
})


const Users = mongoose.model('Users', userInfo)
module.exports = Users