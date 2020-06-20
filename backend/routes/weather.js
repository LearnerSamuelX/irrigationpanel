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
    let user_selected = await Users.findOne({username:user_info.username})
    res.json(user_selected)
})

//use get for now, change it to post later
let cityname = ''
let countryname = ''

router.post('/loggedin/citySearch',(req,res)=>{
    cityname = req.body.cityName
    countryname = req.body.country

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
                name:cityname,
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

router.get('/loggedin/citySearch',async(req,res)=>{
    let status_check = await CityPoint.findOne({name:cityname})
    res.json(status_check)
})




//just for testing purposes
router.get('/testing',async (req,res)=>{
    let stored_data = await Users.find()
    res.json(stored_data)
})

module.exports=router