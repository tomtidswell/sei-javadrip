//packages
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bulma'

//styles
import './styles/style.scss'

//components
//import SecureRoute from './components/common/SecureRoute'
import Home from './components/Home'
//import Briefing from './components/Home'    <Route path="/briefing/:day" component={Briefing} />
import NavBar from './components/NavBar'
import Settings from './components/Settings'
//import Login from './components/auth/Login'


//the secure route tags (functions) are custom, and is a functional component in the common folder
const App = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <NavBar />
        <Switch>
          <Route exact path="/settings" component={Settings} />
          <Route path="/" component={Home} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />,document.getElementById('root'))



// javaDrip - your morning briefing while you sip

// JOURNEYS

//Journey A - first time access
// 1. User chooses and saves location and name
// 2. Shows the javaDrip

// Journey B - returning user
// Shows the javaDrip

//Journey C - user wants to change location
// 1. User chooses to switch cities   (or maybe detect current location based on browser location API)
// 2. User chooses and saves location
// 3. Shows javaDrip


// WIREFRAMES
// 1. - the javaDrip
// 2. - choosing and setting location


// PSEUDOCODE
// A. - the javaDrip

// Display title - "What to wear"

// When clicked, the state changes, and does the following.....

// Hardcode to London (placeholder for future for other locations)

// Use the location to fetch the next morning's weather from the OpenWeatherMap API

// Run the rules on the weather data to determine the clothes the user should wear,

// Save the recommendations into state along with the weather data - that retriggers the render

// Render the recommendation in the component




// RULES
// Work out what the weather 'feels like' based on ???
// If the feels like is under 10 deg, recommend a coat
// If the feels like is under 15 deg, recommend a jumper
// If it is raining, recommend an umberella
// If it is snowing, recommend wellies and a coat





// https://api.darksky.net/forecast/884e2989584a1311deac60a086aac988/51.5074,0.1278?exclude=minutely,daily,currently&units=si
