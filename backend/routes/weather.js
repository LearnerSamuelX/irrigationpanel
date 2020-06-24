const router = require('express').Router();
const fs = require('fs')
const fetch = require("node-fetch");
const Users = require('../models/userid'); //name of the database
const CityPoint = require('../models/geoloc')



let user_info = ''
let username = ''
let password = ''

router.post('/usercreated', async (req,res)=>{
    username = req.body.username
    password = req.body.password

    user_info = await new Users({
        username,
        password
    }).save()

    res.json(user_info)
})

router.get('/loggedin',(req,res)=>{
    setTimeout(async()=>{    
        let user_selected = await Users.findOne({username:user_info.username})
        res.json(user_selected)
    },25)
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

    fs.readFile('../public/weatherdata/citylist.json', async (err,data)=>{
        if(err){
            console.log(err)
            res.send('Wrong.')
        }else{
            user_info.cityName = cityname
            user_info.countryCode = countryname

            await Users.findOneAndUpdate(
                {username:user_info.username},
                {
                    cityName:cityname,
                    countryCode:countryname
                }
            )
            
            let selected_city=(JSON.parse(data)).filter(i=>i.name===cityname && i.country===countryname)
            //create a CityLoc instance here
            const cityLocation = await new CityPoint({
                name:cityname,
                'location':{
                    'type':'Point',
                    'coordinates': [selected_city[0].coord.lon,selected_city[0].coord.lat]
                }
            }).save()
            console.log('Post request\n'+user_info)
            console.log(cityLocation)
            res.json(selected_city[0])
        }
    })

})

let status_check = ""
let weather_data=""
router.get('/loggedin/citySearch',(req,res)=>{
    //how come when passing multiple conditions, it returns null
    //i guess it has something to do with asynchronous delay
    weather_data = "loading"
    setTimeout(()=>{
        Users.findOne({username:user_info.username},async(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    status_check = result
                    if (status_check===""){
                        res.send('Please log into the system')
                    }else{
                        let cityname_url=status_check.cityName
                        let country_url=status_check.countryCode
                        let api_key='2357e9d6edbc1dca9778ffaae19a1bf0'
                        let state_url=""
                        let raw = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityname_url},${country_url}&appid=${api_key}`)
                        weather_data = await raw.json();
                        console.log(weather_data)
                        res.json(weather_data)
                    }
                }
            })
    },250)
})

router 


//just for testing purposes
router.get('/testing',async (req,res)=>{
    let stored_data = await Users.find()
    res.json(stored_data)
})

module.exports=router