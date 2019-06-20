import React, { Component }  from 'react'
import WhatToWear from './WhatToWear'
import TravelStatus from './TravelStatus'
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
        <div className="headline">
          <h1 className="">JavaDrip</h1>
          <i className="fas fa-tint drip-1"></i>
          <i className="fas fa-tint drip-2"></i>
          <i className="fas fa-cloud-sun-rain cloud-headline"></i>
          <p className="subtitle">...plan your day whilst you sip</p>
        </div>
        <WhatToWear />
        {city === 'London' && <TravelStatus />}
      </main>
    )
  }
}

export default Home
