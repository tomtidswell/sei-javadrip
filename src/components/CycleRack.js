import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Auth from '../lib/Auth'

class CycleRack extends React.Component {
  constructor() {
    super()

    this.state = { points: null, load: false, userData: Auth.getUserData() }
  }

  componentDidUpdate() {
    //if we are not set to load, dont!
    if(!this.state.load) return
    //if we already have data, dont load it again
    if(this.state.points) return

    if (!this.state.userData) return
    const { userData } = this.state

    if (userData.lat && userData.lon){
      console.log('fetching bike points')
      this.getBikePoints(userData.lat, userData.lon, 1000)
    }
  }

  getBikePoints(lat, lon, radius) {
    //console.log('parameters', lat, lon)
    axios.get('https://api.tfl.gov.uk/bikepoint', {
      params: { lat, lon, radius }
    })
      .then(res => this.setState({ points: res.data.places }))
      .catch(err => console.log(err))
  }

  toggleComponent(){
    this.setState({ load: !this.state.load })
  }

  render() {

    console.log('user data:',this.state.userData)
    console.log('bike points:',this.state.points)

    // Initial state - pre API load
    if(!this.state.load) return (
      <a className="button is-large initial"
        onClick={()=>this.toggleComponent()}>
        Your cycle rack
      </a>
    )
    
    // API loading state
    if (!this.state.userData || !this.state.userData.postcode) return (
      <section className="button is-large cycle-rack">
        <Link to="/settings">
          Set up your home postcode to use this feature
        </Link>
      </section>
    )

    // API loading state
    if(!this.state.points) return (
      <p className="button is-large initial is-loading"></p>
    )


    // API loading state
    if(this.state.points.length === 0) return (
      <section className="section cycle-rack">
        There are no bike points near your postcode.&nbsp;
        <Link to="/settings"> Change it?</Link>
      </section>
    )

    // Completed state - show travel
    const nearestBikePoint = this.state.points[0]
    let pointData = {}
    nearestBikePoint.additionalProperties.forEach(prop => {
      switch (prop.key) {
        case 'NbDocks': pointData = {...pointData, total: prop.value }
          break
        case 'NbBikes': pointData = {...pointData, available: prop.value }
          break
        case 'NbEmptyDocks': pointData = {...pointData, empty: prop.value }
          break
      }
    })

    //console.log(pointData)

    return (
      <section className="section cycle-rack">
        <h2>Your cycle rack</h2>
        <a role="button" className="navbar-burger is-active close" onClick={()=>this.toggleComponent()}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>


        <div className="card">
          <div className="card-content">
            <p className="subtitle">The nearest cycle point to you is <strong>{nearestBikePoint.commonName}</strong></p>
          </div>
          <footer className="card-footer">
            <p className="card-footer-item">
              {pointData.empty} empty spaces
            </p>
            <p className="card-footer-item">
              <i className="fas fa-bicycle"></i>: {pointData.available} / {pointData.total}
            </p>
          </footer>
        </div>

      </section>
    )

  }
}

export default CycleRack
