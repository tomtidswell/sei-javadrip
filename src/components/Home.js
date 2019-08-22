import React, { Component }  from 'react'
import WhatToWear from './WhatToWear'
import TravelStatus from './TravelStatus'
import CycleRack from './CycleRack'

import Auth from '../lib/Auth'

class Home extends Component{
  constructor(){
    super()
    this.state = { data: {} }
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  toggleNavbar(){
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }


  render(){
    const city = Auth.getUserData() ? Auth.getUserData().city : 'London'

    return (
      <main>
        <header>
          <p className="title">JavaDrip</p>
          <i className="fas fa-tint drip"></i>
          <i className="fas fa-cloud-sun-rain cloud"></i>
          <p className="subtitle">plan your day whilst you sip</p>
        </header>
        <WhatToWear />
        {city === 'London' && <TravelStatus />}
        {city === 'London' && <CycleRack />}
      </main>
    )
  }
}

export default Home
