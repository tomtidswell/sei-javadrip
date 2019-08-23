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
    <BrowserRouter basename={process.env.SUBDIR}>
      <Fragment>
        <NavBar />
        <Switch>
          <Route path="/settings" component={Settings} />
          <Route path="/" component={Home} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />,document.getElementById('root'))

