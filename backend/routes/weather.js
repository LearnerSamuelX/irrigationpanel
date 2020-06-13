const router = require('express').Router();
const User = require('../models/userid');


const user_info = ''
router.post('/add',async (req,res)=>{
    user_info = new User({
        username,
        password,
        cityName
    })
    try{
        const login = await user_info.save()
        res.send("Success.")
    }catch{
        (err)=>{
            console.log(err)
            res.send("Something is wrong.")
        }
    }
})