const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cornerPoints = new Schema({

})
//you need five points here



const Rectangle = mongoose.model('Polyline',cornerPoints)
module.exports=Rectangle