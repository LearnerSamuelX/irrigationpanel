const router = require('express').Router();
const fs = require('fs')
const Users = require('../models/userid'); //name of the database


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


router.get('/loggedin',async (req,res)=>{
    if (user_info===''){
        res.send('Please log into the system')
    }else{
        let user_selected = await Users.findOne({username:user_info.username})
        res.json(user_selected)
    }
})

router.post('/usercreated', async (req,res)=>{
    const username = req.body.username
    const password = req.body.password

    user_info = await new Users({
        username,
        password
    }).save()

    res.json(user_info)
    // res.redirect('loggedin')
})

//use get for now, change it to post later
router.get('/loggedin/citySearch',async (req,res)=>{
    //search citylist.json
    //const cityname = req.body.cityName

    fs.readFile('../public/weatherdata/cityList.json', (err,data)=>{
        if(err){
            console.log(err)
            res.send('Wrong.')
        }else{
            console.log('Success')
            res.json(JSON.parse(data).filter(i=>i.name==="Toronto"))
        }
    })

})

module.exports=router