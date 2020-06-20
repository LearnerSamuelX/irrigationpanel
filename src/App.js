import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route,Link,Switch, BrowserRouter} from "react-router-dom" ;


import Homepage from './component/homepage.js'
import LoginComponent from "./component/logincomponent.js"
import SignUpComponent from "./component/signupcomponent.js"
import CitySearch from "./component/citysearch.js"
import UsersPanel from "./component/userspanel.js"


//this page is not a parenting component as it takes no user input which will be passed on to other
//component later on

function App() {
  
  return (
    <div id='container'>
      <BrowserRouter>
        <Switch>
          <Route exact path = '/'component={Homepage} />
          <Route path='/Login' component={LoginComponent}/>
          <Route path='/SignUp'component={SignUpComponent}/>
          <Route path='/citySearch'component={CitySearch}/>
          <Route path='/usersPanel'component={UsersPanel}/>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
