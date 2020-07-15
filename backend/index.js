const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path') //this line is for deployement 

const weatherRoute = require('./routes/weather.js')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000 //take a look at here later on

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'/build')))

app.use('/weather',weatherRoute)

const atlas_uri = process.env.ATLAS_URI  //use local library for now
const local_uri = process.env.LOCAL_URI

mongoose.connect(atlas_uri,{useNewUrlParser:true,useCreateIndex:true})
mongoose.set('useFindAndModify', false);

const db = mongoose.connection
db.once('open',()=>{
    console.log('Mongoose database connected') 
})

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/build/index.html'))
})

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
});