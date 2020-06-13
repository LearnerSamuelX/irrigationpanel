const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

//const cors = require('cors')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000

// app.use(cors())
app.use(bodyParser.json())

const atlas_uri = process.env.ATLAS_URI  //use local library for now
const local_uri = process.env.LOCAL_URI
mongoose.connect(local_uri,{useNewUrlParser:true,useCreateIndex:true})

const db = mongoose.connection
db.once('open',()=>{
    console.log('Mongoose database connected') //
})


app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
});