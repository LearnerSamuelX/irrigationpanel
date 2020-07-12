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
                        let raw = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityname_url},${country_url}&appid=${process.env.API_KEY}`)
                        weather_data = await raw.json();
                        res.json(weather_data)
                    }
                }
            })
        }
    },250)
})


let zone_collection = []
router.get('/radar',(req,res)=>{
    zone_collection = []
    let x_point = weather_data.coord.lon
    let y_point = weather_data.coord.lat
    let wind_deg = weather_data.wind.deg

    let radar_range = 150  //unit in km  25 + 25 + 50 + 50

    let radar_range_list  = [50,50,50]
    let zone_range = 12.5
    let zone_weather_condition = []
    let regional_weather_condition = []

    let x_d = 0
    let y_d = 0
    let increment=0.00899321

    let x_new_a = 0  //diagonal point, top left
    let y_new_a = 0  

    let x_new_d = 0  //diagonal point, bottom right
    let y_new_d = 0  

    /* Algorithm Design:
    -. get the wind direction of the targeted city *DONE

    -. find the coordinates of the point, 25 km along the direction
    -. create Zone I, 10 x 10
    -. get the coordinates of diagonal points
    -. find the cities in the zone using query condition, and determine their wind directions, and get the average value

    -. find the coordinates of the point, 25 km along the new direction
    -. create Zone II, 10 x 10
    -. get the coordinates of diagonal points
    -. find the cities in the zone using query condition, and determine the average wind direction

    -. find the coordinates of the point, 25 km along the new direction
    -. create Zone III, 10 x 10
    -. get the coordinates of diagonal points
    -. find the cities in the zone using query condition, and determine the average wind direction

    -. find the coordinates of the point, 25 km along the new direction
    -. create Zone III, 10 x 10
    -. get the coordinates of diagonal points
    -. find the cities in the zone using query condition, and determine the average wind direction
    */
    let city_pool = []
    let new_angle = 0
    for (let m=0;m<radar_range_list.length;m++){
        
        let index = m
        setTimeout(()=>{
            console.log('Centre point coordinates for inputs: '+' '+ x_point +' '+ y_point + '. Round:'+m)
            let range = radar_range_list[index]
            if(wind_deg>=0&&wind_deg<90){
                x_d=range*Math.abs(Math.sin(wind_deg*Math.PI/180))
                y_d=range*Math.abs(Math.cos(wind_deg*Math.PI/180))
                x_new = x_point + x_d*increment
                y_new = y_point + y_d*increment
            }else if(wind_deg>=90&&wind_deg<180){
                x_d=range*Math.abs(Math.cos((wind_deg-90)*Math.PI/180))
                y_d=range*Math.abs(Math.sin((wind_deg-90)*Math.PI/180))
                x_new = x_point + x_d*increment
                y_new = y_point - y_d*increment
            }else if(wind_deg>=180&&wind_deg<270){
                x_d=range*Math.abs(Math.sin((wind_deg-180)*Math.PI/180))
                y_d=range*Math.abs(Math.cos((wind_deg-180)*Math.PI/180))
                x_new = x_point - x_d*increment
                y_new = y_point - y_d*increment
            }else{
                x_d=range*Math.abs(Math.cos((wind_deg-270)*Math.PI/180))
                y_d=range*Math.abs(Math.sin((wind_deg-270)*Math.PI/180))
                x_new = x_point - x_d*increment
                y_new = y_point + y_d*increment
            }

            x_new_a = x_new - zone_range*increment
            y_new_a = y_new + zone_range*increment

            x_new_b = x_new + zone_range*increment
            y_new_b = y_new + zone_range*increment

            x_new_c = x_new - zone_range*increment
            y_new_c = y_new - zone_range*increment

            x_new_d = x_new + zone_range*increment
            y_new_d = y_new - zone_range*increment

            let polyLineCoordinates = [
                {
                    lat:y_new_a,
                    lng:x_new_a
                },
                
                {
                    lat:y_new_b,
                    lng:x_new_b   
                },
                {
                    lat:y_new_d,
                    lng:x_new_d,
                },
                {
                    lat:y_new_c,
                    lng:x_new_c
                },
                {
                    lat:y_new_a,
                    lng:x_new_a
                }
            ]
            zone_collection.push(polyLineCoordinates)

            console.log('Wind Direction '+wind_deg + '. '+' Round:'+m)
            console.log(x_new_a,y_new_a)
            console.log(x_new_d,y_new_d)

            zone_weather_condition = []
            fs.readFile('../public/weatherdata/citylist.json',(err,data)=>{
                if(err){
                    console.log(err)
                }
                else{
                    city_pool = (JSON.parse(data)).filter(
                        i=>i.coord.lon>=x_new_a&&i.coord.lat<=y_new_a&&i.coord.lon<=x_new_d&&i.coord.lat>=y_new_d
                    )
                    console.log(city_pool)
                }
            })
        },4000*m)

        //it will take some time going through this massive geolocation file
        setTimeout(()=>{
            if(city_pool.length===0){
                console.log('Reached water with unknown marine data.')
                return
            }else{
                city_pool.map(async(i)=>{
                    let cityname = i.name
                    let countryname = i.country
                    let api_key='2357e9d6edbc1dca9778ffaae19a1bf0'
                    let raw = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityname},${countryname}&appid=${api_key}`)
                    let data = await raw.json()
                    zone_weather_condition.push(data)
                })
            }
        },3000*(m+1))

        setTimeout(()=>{
            //determine the avaerage value of wind direction
            // console.log(zone_weather_condition)  //the weather condition of cities in the 1st square
            let wind_direction = []
            zone_weather_condition.map((j)=>{
                wind_direction.push(j.wind.deg)
            })
            wind_direction.sort((a, b)=>{
                return b-a
            })
            //sorted in descending order
            console.log('List of Wind Direction: '+ wind_direction)
            
            for (let k=0;k<wind_direction.length;k++){
                let cursor = wind_direction[k]
                let ref = 1
                let ruler = wind_direction.filter(i=>i===cursor)
                // console.log(ruler)
                if(ruler.length>=ref){
                    ref = ruler.length
                    new_angle = wind_direction[k]
                }
                // console.log(new_angle)
            }
            wind_deg = new_angle
            // console.log('New wind direction is:'+ wind_deg)
            regional_weather_condition.push(zone_weather_condition)
            x_point = x_new
            y_point = y_new
            console.log(m+' Updated to point ' + x_point +', '+ y_point) 
            console.log('------|------|------|------|------|------') 
        },3200*(m+1))
            
    }

    setTimeout(()=>{
        console.log('Terminated at: ' + x_point +' '+ y_point)
        // console.log(regional_weather_condition)
        console.log(zone_collection)
        res.json(regional_weather_condition) //render weather data of the cities in the predicative zone to Front End
    },4300*radar_range_list.length)
})

router.get('/radar_2',(req,res)=>{
    res.json(zone_collection)
})


//just for testing purposes
router.get('/testing',async (req,res)=>{
    let stored_data = await Users.find()
    res.json(stored_data)
})

module.exports=router