(this.webpackJsonpvi=this.webpackJsonpvi||[]).push([[0],{32:function(e,t,a){e.exports=a(72)},37:function(e,t,a){},38:function(e,t,a){e.exports=a.p+"static/media/logo.78fda65f.svg"},39:function(e,t,a){},40:function(e,t,a){},62:function(e,t,a){},63:function(e,t,a){},64:function(e,t,a){},65:function(e,t,a){},69:function(e,t,a){},70:function(e,t,a){},71:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(30),i=a.n(o),s=(a(37),a(38),a(39),a(13)),l=a(1),c=a(3),u=a(4),d=a(6),h=a(5),m=(a(40),function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{id:"homepage-container"},r.a.createElement("h1",null,"Irrigation Panel"),r.a.createElement("div",{id:"homepage-button-containter"},r.a.createElement(s.b,{to:"/Login"},r.a.createElement("button",null,"Login")),r.a.createElement(s.b,{to:"/SignUp"},r.a.createElement("button",null,"Sign Up"))))}}]),a}(n.Component)),p=a(8),g=a(7),v=a.n(g),y=(a(62),function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).onChangeUsername_JSX=n.onChangeUsername.bind(Object(p.a)(n)),n.onChangePassword_JSX=n.onChangePassword.bind(Object(p.a)(n)),n.onSubmit=n.onSubmit.bind(Object(p.a)(n)),n.state={username:"",password:""},n}return Object(u.a)(a,[{key:"onChangeUsername",value:function(e){this.setState({username:e.target.value})}},{key:"onChangePassword",value:function(e){this.setState({password:e.target.value})}},{key:"onSubmit",value:function(e){if(e.preventDefault(),""===this.state.username||""===this.state.password)alert("Please fill in the required info to log in");else{var t={username_2:this.state.username,password_2:this.state.password};v.a.post("http://localhost:5000/weather/loggedin",t).then((function(e){console.log(e.data)}));this.props.history.push("userspanel")}}},{key:"render",value:function(){return r.a.createElement("div",{id:"login-container"},r.a.createElement("form",{id:"form-container"},r.a.createElement("div",{id:"username"},r.a.createElement("label",null,"Username:"),r.a.createElement("input",{type:"text",value:this.state.username,onChange:this.onChangeUsername_JSX})),r.a.createElement("div",{id:"password"},r.a.createElement("label",null,"Password:"),r.a.createElement("input",{type:"password",value:this.state.password,onChange:this.onChangePassword_JSX})),r.a.createElement("button",{onClick:this.onSubmit},"Login")))}}]),a}(n.Component)),E=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).onChangeUsername=n.onChangeUsername.bind(Object(p.a)(n)),n.onChangePassword=n.onChangePassword.bind(Object(p.a)(n)),n.onChangePassword_2=n.onChangePassword_2.bind(Object(p.a)(n)),n.onSubmit=n.onSubmit.bind(Object(p.a)(n)),n.state={username:"",password:"",password_2:""},n}return Object(u.a)(a,[{key:"onChangeUsername",value:function(e){this.setState({username:e.target.value})}},{key:"onChangePassword",value:function(e){this.setState({password:e.target.value})}},{key:"onChangePassword_2",value:function(e){this.setState({password_2:e.target.value})}},{key:"onSubmit",value:function(e){if(e.preventDefault(),this.state.password!==this.state.password_2)alert("Passwords don't match. Please type again");else if(""===this.state.username||""===this.state.password||""===this.state.password_2)alert("Missing information");else{var t={username:this.state.username,password:this.state.password};v.a.all([v.a.post("http://localhost:5000/weather/usercreated",t),v.a.get("http://localhost:5000/weather/loggedin")]).then((function(e){console.log(e[0].data)}));this.props.history.push("citySearch")}}},{key:"render",value:function(){return r.a.createElement("div",{id:"login-container"},r.a.createElement("form",{id:"form-container"},r.a.createElement("div",{id:"username"},r.a.createElement("label",null,"Username:"),r.a.createElement("input",{type:"text",value:this.state.username,onChange:this.onChangeUsername})),r.a.createElement("div",{id:"password"},r.a.createElement("label",null,"Password:"),r.a.createElement("input",{id:"input-1",type:"password",value:this.state.password,onChange:this.onChangePassword}),r.a.createElement("label",null,"Confirm Password:"),r.a.createElement("input",{type:"password",value:this.state.password_2,onChange:this.onChangePassword_2})),r.a.createElement("button",{onClick:this.onSubmit},"Sign Up")))}}]),a}(n.Component),f=(a(63),function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).onChangeCityName=n.onChangeCityName.bind(Object(p.a)(n)),n.onChangeCountry=n.onChangeCountry.bind(Object(p.a)(n)),n.citySearch=n.citySearch.bind(Object(p.a)(n)),n.state={username:"",cityName:"",country:"",loaded:!1},n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=this;v.a.get("http://localhost:5000/weather/loggedin").then((function(t){"Error"===t.data?(console.log("hahaha"+t),e.setState({username:"Error",loaded:!0})):(console.log(t.data),e.setState({username:t.data.username,loaded:!0}))}))}},{key:"onChangeCityName",value:function(e){this.setState({cityName:e.target.value})}},{key:"onChangeCountry",value:function(e){this.setState({country:e.target.value})}},{key:"citySearch",value:function(e){e.preventDefault();var t={cityName:this.state.cityName,country:this.state.country};v.a.post("http://localhost:5000/weather/loggedin/citySearch",t);this.props.history.push("userspanel")}},{key:"render",value:function(){return""===this.state.username&&!1===this.state.loaded?r.a.createElement("div",null,r.a.createElement("p",null,"Loading Data")):"Error"===this.state.username&&!0===this.state.loaded?r.a.createElement("div",null,r.a.createElement("h3",null,"Please login into the system first")):r.a.createElement("div",{id:"greeting"},r.a.createElement("h1",null,"Hello,  ",this.state.username,"!"),r.a.createElement("form",{id:"city-search-container"},r.a.createElement("div",{id:"city-search"},r.a.createElement("p",null,"Enter your city: "),r.a.createElement("input",{type:"text",value:this.state.cityName,onChange:this.onChangeCityName})),r.a.createElement("div",{id:"country-search"},r.a.createElement("p",null,"Enter your Country: "),r.a.createElement("input",{type:"text",value:this.state.country,onChange:this.onChangeCountry})),r.a.createElement("button",{onClick:this.citySearch},"Search")))}}]),a}(n.Component)),b=(a(64),function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={cityname:"",countryname:""},n}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{id:"main-container"},r.a.createElement("h2",null,"Main Menu"),r.a.createElement("div",{id:"link-container"},r.a.createElement(s.b,{to:"/userspanel/radar"},r.a.createElement("button",null,"Radar")),r.a.createElement(s.b,{to:"/userspanel/analog"},r.a.createElement("button",null,"Analog"))))}}]),a}(n.Component));a(65);a(66).config();var w=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).googleMap=r.a.createRef(),n.state={cityname:n.props.datasource.name,cityCoordinate:[n.props.datasource.coord.lon,n.props.datasource.coord.lat],winddirection:n.props.datasource.wind.deg,cityPool:[],borderLine:[],zoneData:[]},n}return Object(u.a)(a,[{key:"initMap",value:function(){return new window.google.maps.Map(this.googleMap.current,{zoom:8,center:{lat:this.state.cityCoordinate[1],lng:this.state.cityCoordinate[0]},disableDefaultUI:!0})}},{key:"targetedCityMarker",value:function(){new window.google.maps.Marker({position:{lat:this.state.cityCoordinate[1],lng:this.state.cityCoordinate[0]},map:this.map_1})}},{key:"cityPoolPolyLine",value:function(){var e=[];this.state.cityPool.map((function(t){return e.push(t.location),e})),console.log(this.state.borderLine),console.log(e);for(var t=["#2AA181","#3FF0D0","#B6C724"],a=0;a<this.state.borderLine.length;a++)new window.google.maps.Polyline({path:this.state.borderLine[a],geodesic:!0,strokeColor:t[a],strokeOpacity:1,strokeWeight:2,map:this.map_1})}},{key:"componentDidMount",value:function(){var e=this;v.a.get("http://localhost:5000/weather/radar").then((function(t){console.log(t.data),e.setState({cityPool:t.data})}));for(var t=1;t<6;t++)setTimeout((function(){v.a.get("http://localhost:5000/weather/radar_2").then((function(t){e.setState({borderLine:t.data}),console.log(e.state.cityCoordinate),console.log(e.state.borderLine)}))}),2500*t)}},{key:"render",value:function(){return r.a.createElement("div",{className:"radar-page"},r.a.createElement("h1",null,"Weather Radar"),r.a.createElement("p",null,"City Coordinates:Lon: ",this.state.cityCoordinate[0],", Lat: ",this.state.cityCoordinate[1]),r.a.createElement("p",null,"Wind Direction: ",this.state.winddirection,"\u02da "),r.a.createElement("div",{id:"predictiveZones"},r.a.createElement("p",null,"Zone Data: ",this.state.zoneData)),r.a.createElement("div",{id:"google-map",ref:this.googleMap,style:{width:"800px",height:"600px"}}))}}]),a}(n.Component),C=(a(69),function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={angle:-90,display:0},n}return Object(u.a)(a,[{key:"pinMovement",value:function(){var e=180/(this.props.range[1]-this.props.range[0]),t=(this.props.nominal-this.props.range[0])*e;this.setState({angle:this.state.angle+t,display:t})}},{key:"componentDidMount",value:function(){this.pinMovement()}},{key:"render",value:function(){return r.a.createElement("div",{className:"dashboard-container"},r.a.createElement("div",{className:"dashboard"},r.a.createElement("div",{className:"shaft"}),r.a.createElement("div",{className:"pin",style:{transform:"rotate(".concat(this.state.angle,"deg)")}}),r.a.createElement("div",{className:"title"},this.props.nominal,this.props.unit),r.a.createElement("div",{className:"range1"},this.props.range[0],this.props.unit),r.a.createElement("div",{className:"range1p5"}),r.a.createElement("div",{className:"range2"},this.props.range[1],this.props.unit),r.a.createElement("div",{className:"dashtext"},r.a.createElement("p",null,this.props.title))))}}]),a}(n.Component)),O=(a(70),function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={cityname:"",temperature:Math.round(n.props.datasource.main.temp-273.15),humidity:n.props.datasource.main.humidity,windspeed:n.props.datasource.wind.speed,winddirection:n.props.datasource.wind.deg},n}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"analog-page"},r.a.createElement("h2",{className:"page-title"},"Analog Weather Dashboard"),r.a.createElement("div",{className:"dashboard-collection"},r.a.createElement("div",null,r.a.createElement(C,{nominal:this.state.temperature,range:[10,40],unit:"\u02daC",title:"Temperature"})),r.a.createElement("div",null,r.a.createElement(C,{nominal:this.state.humidity,range:[10,100],unit:"%",title:"Humidity"})),r.a.createElement("div",null,r.a.createElement(C,{nominal:3.6*Math.round(this.state.windspeed),range:[0,50],unit:"km",title:"Windspeed"}))))}}]),a}(n.Component)),j=(a(71),function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={weatherdata:"",loaded:!1},n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=this;v.a.get("http://localhost:5000/weather/loggedin/citySearch").then((function(t){console.log(t.data),e.setState({weatherdata:t.data,loaded:!0})}))}},{key:"render",value:function(){return!1===this.state.loaded&&""===this.state.weatherdata?r.a.createElement("div",null,r.a.createElement("h3",null,"Loading data")):!0===this.state.loaded&&"Error"===this.state.weatherdata?r.a.createElement("div",null,r.a.createElement("h3",null,"Please Log into the System")):r.a.createElement("div",{id:"container"},r.a.createElement("div",{className:"location"},r.a.createElement("h2",null,"Location: ",this.state.weatherdata.name,",",this.state.weatherdata.sys.country)),r.a.createElement(s.a,null,r.a.createElement(l.c,null,r.a.createElement(l.a,{exact:!0,path:"/userspanel"},r.a.createElement(b,{datasource:this.state.weatherdata})),r.a.createElement(l.a,{path:"/userspanel/radar"},r.a.createElement(w,{datasource:this.state.weatherdata})),r.a.createElement(l.a,{path:"/userspanel/analog"},r.a.createElement(O,{datasource:this.state.weatherdata})))))}}]),a}(n.Component));var k=function(){return r.a.createElement("div",{id:"container"},r.a.createElement(s.a,null,r.a.createElement(l.c,null,r.a.createElement(l.a,{exact:!0,path:"/",component:m}),r.a.createElement(l.a,{path:"/Login",component:y}),r.a.createElement(l.a,{path:"/SignUp",component:E}),r.a.createElement(l.a,{path:"/citySearch",component:f}),r.a.createElement(l.a,{path:"/usersPanel",component:j}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[32,1,2]]]);
//# sourceMappingURL=main.aaa06bf0.chunk.js.map