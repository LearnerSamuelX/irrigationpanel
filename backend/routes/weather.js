const router = require('express').Router();
const fs = require('fs')
const fetch = require("node-fetch");
const Users = require('../models/userid'); //name of the database
const CityPoint = require('../models/geoloc')
const RadarCity = require('../models/radar')


let user_info = ""
let username = ""
let password = ""
let loggedin_user=""

require('dotenv').config();

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
                        // let api_key='2357e9d6edbc1dca9778ffaae19a1bf0'
                        let state_url=""
                        let raw = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityname_url},${country_url}&appid=${process.env.API_KEY}`)
                        weather_data = await raw.json();
                        // console.log(weather_data)
                        res.json(weather_data)
                    }
                }
            })
        }
    },250)
})

let city_pool = []
let weather_pool = []
let city_weather_pool  = []

let x_1 = 0
let x_2 = 0
let x_3 = 0 
let x_4 = 0
let y_1 = 0
let y_2 = 0
let y_3 = 0 
let y_4 = 0

router.get('/radar',(req,res)=>{

    let x_point = weather_data.coord.lon
    let y_point = weather_data.coord.lat
    let wind_deg = weather_data.wind.deg

    let radar_range = 150  //unit in km
    let x_d = 0
    let y_d = 0
    let increment=0.00899321 //increment value of degree change for lon & lat

    let x_new = 0
    let y_new = 0 

    x_d=radar_range*Math.abs(Math.sin(wind_deg*Math.PI/180))
    y_d=radar_range*Math.abs(Math.cos(wind_deg*Math.PI/180))

    if(wind_deg>=0&&wind_deg<90){
        x_d=radar_range*Math.abs(Math.sin(wind_deg*Math.PI/180))
        y_d=radar_range*Math.abs(Math.cos(wind_deg*Math.PI/180))
        x_new = x_point + x_d*increment
        y_new = y_point + y_d*increment
    }else if(wind_deg>=90 && wind_deg<180){
        x_d=radar_range*Math.abs(Math.cos((wind_deg-90)*Math.PI/180))
        y_d=radar_range*Math.abs(Math.sin((wind_deg-90)*Math.PI/180))
        x_new = x_point + x_d*increment
        y_new = y_point - y_d*increment
    }else if(wind_deg>=180 && wind_deg<270){
        x_d=radar_range*Math.abs(Math.sin((wind_deg-180)*Math.PI/180))
        y_d=radar_range*Math.abs(Math.cos((wind_deg-180)*Math.PI/180))
        x_new = x_point - x_d*increment
        y_new = y_point - y_d*increment
    }else if(wind_deg>270 && wind_deg<360){
        x_d=radar_range*Math.abs(Math.cos((wind_deg-270)*Math.PI/180))
        y_d=radar_range*Math.abs(Math.sin((wind_deg-270)*Math.PI/180))
        x_new = x_point - x_d*increment
        y_new = y_point + y_d*increment
    }

    // coordinates of the reference point
    // console.log(x_new)
    // console.log(y_new)

    let half_width = 20

    x_1 = x_new - half_width*increment
    y_1 = y_new + half_width*increment
        
    x_2 = x_new + half_width*increment
    y_2 = y_new + half_width*increment

    x_3 = x_new + half_width*increment
    y_3 = y_new - half_width*increment

    x_4 = x_new - half_width*increment
    y_4 = y_new - half_width*increment

    let x_m = x_new
    let y_m = y_new - half_width*increment

    fs.readFile('../public/weatherdata/citylist.json',(err,data)=>{
        if(err){
            console.log(err)
        }else{
                city_pool = (JSON.parse(data)).filter(i=>
                i.coord.lon>=x_1&&i.coord.lat<=y_1&&i.coord.lon<=x_3&&i.coord.lat>=y_3
            )
            // console.log(city_pool)
        }
    })

    weather_pool = [ ]
    city_weather_pool = [ ]
    setTimeout(()=>{
        city_pool.forEach(async(j)=>{
            let cityname = j.name
            let countryname = j.country
            let api_key='2357e9d6edbc1dca9778ffaae19a1bf0'
            let raw = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityname},${countryname}&appid=${api_key}`)
            let data = await raw.json()
            weather_pool.push(data)
        })
    },1000) //testing

    setTimeout(()=>{
        weather_pool.forEach(async (n)=>{
            let reference_point = await RadarCity({
                name:n.name,
                'location':{
                    'type':'Point',
                    'coordinates': [n.coord.lon,n.coord.lat]
                },
                weather:n.weather[0].main
            }).save()
            city_weather_pool.push(reference_point)
        })
    },2500)

    let rain_counter = 0
    setTimeout(()=>{
        //implement probablity calculation here
        weather_pool.forEach((k)=>{
            if(k.weather.main==='Rain'){
                rain_counter = rain_counter + 1
            }
        })
        console.log('Rain Probability is: '+ rain_counter/weather_pool.length)
        console.log(city_pool)
        res.json(city_weather_pool)
    },4000)
})


router.get('/radar_2',(req,res)=>{
    setTimeout(()=>{
        let polyLineCoordinates = [
            {
                lat:y_1,
                lng:x_1
            },
            
            {
                lat:y_2,
                lng:x_2
            },
            {
                lat:y_3,
                lng:x_3
            },
            {
                lat:y_4,
                lng:x_4
            },
            {
                lat:y_1,
                lng:x_1
            }
        ]
        res.json(polyLineCoordinates)
    },3000)
})

//just for testing purposes
router.get('/testing',async (req,res)=>{
    let stored_data = await Users.find()
    res.json(stored_data)
})

module.exports=router