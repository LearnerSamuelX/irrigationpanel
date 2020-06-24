const router = require('express').Router();
const fs = require('fs')
const fetch = require("node-fetch");
const Users = require('../models/userid'); //name of the database
const CityPoint = require('../models/geoloc')



let user_info = ""
let username = ""
let password = ""
let loggedin_user=""

router.post('/usercreated', async (req,res)=>{
    setTimeout(async()=>{
        username = req.body.username
        password = req.body.password
        user_info = await new Users({
            username,
            password
        }).save()
        res.json(user_info)
    },500)
})

//login validation, followed by 'loggedin/citySearch' get request
router.post('/loggedin',async(req,res)=>{
    const username = req.body.username_2
    const password = req.body.password_2
    user_info = await Users.findOne({
        username:username,
        password:password
    })
    res.json(user_info)
})

router.get('/loggedin',(req,res)=>{
    setTimeout(async()=>{
        if (user_info===""){
            loggedin_user="Error"
            res.json(loggedin_user)
        }else{     
            loggedin_user = await Users.findOne({username:user_info.username})
            res.json(loggedin_user)      
        }
    },500)
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
            const cityLocation = await new CityPoint({
                name:cityname,
                'location':{
                    'type':'Point',
                    'coordinates': [selected_city[0].coord.lon,selected_city[0].coord.lat]
                }
            }).save()
            res.json(selected_city[0])
        }
    })

})

let status_check = ""
let weather_data=""
router.get('/loggedin/citySearch',(req,res)=>{
    weather_data = "loading"
    setTimeout(()=>{
        if(user_info===null){
            res.json('Error')
        }else{
        Users.findOne({username:user_info.username},async(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    status_check = result
                    if (status_check===null){
                        weather_data = 'Error'
                        res.json(weather_data)
                    }else{
                        let cityname_url=status_check.cityName
                        let country_url=status_check.countryCode
                        let api_key='2357e9d6edbc1dca9778ffaae19a1bf0'
                        let state_url=""
                        let raw = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityname_url},${country_url}&appid=${api_key}`)
                        weather_data = await raw.json();
                        // console.log(weather_data)
                        res.json(weather_data)
                    }
                }
            })
        }
    },250)
})


//just for testing purposes
router.get('/testing',async (req,res)=>{
    let stored_data = await Users.find()
    res.json(stored_data)
})

module.exports=router