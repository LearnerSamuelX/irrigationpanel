const router = require('express').Router();
const User = require('../models/userid');


let user_info = ''

// router.post('/usercreated',(req,res)=>{
    
//     const username = req.body.username
//     const password = req.body.password

//     user_info = new User({
//         username,
//         password,
//     })

//     user_info.save().then(()=>res.json(user_info))
// })

router.post('/usercreated', async (req,res)=>{
    const username = req.body.username
    const password = req.body.password

    user_info = await new User({
        username,
        password
    }).save()

    res.json(user_info)
    
})

module.exports=router