import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route,Link,Switch, BrowserRouter} from "react-router-dom" ;

import Homepage from './component/homepage.js'
import LoginComponent from "./component/logincomponent.js"
import SignUpComponent from "./component/signupcomponent.js"
import WeatherPanel from "./component/weatherpanel.js"


//this page is not a parenting component as it takes no user input which will be passed on to other
//component later on

function App() {
  
  return (
    <div id='container'>
      <BrowserRouter>
          {/* <Link to="/Login">Hello</Link>
          <Link to='/SignUp'>World</Link> */}
        <Switch>
          <Route exact path = '/'component={Homepage} />
          <Route path='/Login' component={LoginComponent}/>
          <Route path='/SignUp'component={SignUpComponent}/>
          <Route path='/WeatherPanel'component={WeatherPanel}/>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
