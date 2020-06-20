const router = require('express').Router();
const fs = require('fs')
const Users = require('../models/userid'); //name of the database
const CityPoint = require('../models/geoloc')


let user_info = ''

router.post('/usercreated', async (req,res)=>{
    const username = req.body.username
    const password = req.body.password

    user_info = await new Users({
        username,
        password
    }).save()

    res.json(user_info)
})

router.get('/loggedin',async (req,res)=>{
    // if (user_info===''){
    //     res.send('Please log into the system')
    // }else{
    //     let user_selected = await Users.findOne({username:user_info.username})
    //     res.json(user_selected)
    // }
    let user_selected = await Users.findOne({username:user_info.username})
    res.json(user_selected)
})

//use get for now, change it to post later
router.post('/loggedin/citySearch',(req,res)=>{
    let cityname = req.body.cityName
    let countryname = req.body.country


    if(countryname==="Canada"||countryname==="CAN"){
        countryname ="CA"
    }


    fs.readFile('../public/weatherdata/citylist.json', (err,data)=>{
        if(err){
            console.log(err)
            res.send('Wrong.')
        }else{

            user_info.cityName = cityname
            let selected_city=(JSON.parse(data)).filter(i=>i.name===cityname && i.country===countryname)
            //create a CityLoc instance here
            const cityLocation = new CityPoint({
                'location':{
                    'type':'Point',
                    'coordinates': [selected_city[0].coord.lon,selected_city[0].coord.lat]
                }
            })
            console.log(cityLocation)
            res.json(selected_city[0])
        }
    })

})

module.exports=router