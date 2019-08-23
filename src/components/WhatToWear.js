import React, { Component }  from 'react'
import axios from 'axios'
import Auth from '../lib/Auth'

class WhatToWear extends Component{
  constructor(){
    super()
    this.state = { data: null, recco: null, load: false }
  }

  componentDidUpdate(){
    //if we are not set to load, dont!
    if(!this.state.load) return
    //if we already have data, dont load it again
    if(this.state.data) return
    //axios.get('http://api.darksky.net/forecast/<key>/51.5074,0.1278?exclude=minutely,daily,currently&units=si')

    const city = Auth.getUserData() ? Auth.getUserData().city : 'London'
    //console.log('current city', city)

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},uk&units=metric&APPID=${process.env.APPID}`)
      .then( ({ data }) => {
        //console.log('Raw:',data)
        const weather =  this.extractWeatherData(data)
        const recco = this.whatToWearRules(weather)
        this.setState({ recco, data })
      })
      .catch(err => console.log(err))
  }

  extractWeatherData(data){
    const temp =  data.main.temp
    const id = data.weather[0].id
    return {temp, id}
  }

  toggleComponent(){
    this.setState({ load: !this.state.load })
  }

  whatToWearRules({temp, id}) {

    const suggestions = [
      {  //30 degrees and above
        from: 30,
        to: 100,
        materials: 'Light cotton, rayon, linen, performance polyester',
        colour: 'Light',
        outerwear: 'None or only light breathable material',
        layering: 'Only light breathable material'
      },
      { //Between 20 and 30 degrees
        from: 20,
        to: 30,
        materials: 'Medium cotton/denim, rayon, perforemance polyester',
        colour: 'Light',
        outerwear: 'Swearshirt, light jumper',
        layering: 'tshirt'
      },
      { // Between 10 and 20 degrees
        from: 10,
        to: 20,
        materials: 'Medium cotton/denim or polyester',
        colour: 'Dark or light',
        outerwear: 'Light jacket or jumper',
        layering: 'tshirt and a sweatshirt'
      },
      { // Below 10 degrees
        from: -30,
        to: 10,
        materials: 'Wool, cashmere, heavy cotton, flannel, synthetic fibers',
        colour: 'Dark',
        outerwear: 'Gore-Tex shell, heavy wool, down, heavy cotton',
        layering: 'Thermal underwear, sweater'
      }
    ]

    //filter out to the correct suggestion
    let response = suggestions.filter(suggestion => {
      return (suggestion.from < temp &&
              suggestion.to > temp)
    })[0]

    //console.log('temp', temp)
    //console.log('Response after temp', response)

    if(id >= 200 && id <= 531){
      response = {...response, advice: 'There might be rain so take an umberella' }
      response = {...response, icon: 'fas fa-cloud-rain' }
    } else if (id >= 600 && id < 700){
      response = {...response, advice: 'Its going to snow, so remember your wellies!' }
      response = {...response, icon: 'fas fa-cloud-meatball' }
    } else if (id >= 700 && id < 800){
      response = {...response, advice: 'Take care, there will be low visibility' }
      response = {...response, icon: 'fas fa-smog' }
    } else if (id === 800){
      response = {...response, advice: 'Its going to be a clear day remember your sunglasses' }
      response = {...response, icon: 'fas fa-sun' }
    } else if (id >= 800 && id < 900){
      response = {...response, advice: 'Wear something bright to cheer yourself up, its going to be a cloudy day!' }
      response = {...response, icon: 'fas fa-cloud' }
    }

    return response
  }

  render(){

    // Initial state - pre API load
    if(!this.state.load) return (
      <a className="button is-large initial"
        onClick={()=>this.toggleComponent()}>
        What to wear?
      </a>
    )

    // API loading state
    if(!this.state.data) return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    )

    console.log('Recommendations:',this.state.recco)
    console.log('Data at render:',this.state.data)

    // Completed state - show recommendations
    const { advice, materials, colour, outerwear, layering, icon } = this.state.recco
    return (
      <section className="section complete what-to-wear">
        <a role="button" className="navbar-burger is-active close" onClick={()=>this.toggleComponent()}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>

        <div className="columns">

          <div className="column">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">Body Armour</p>
              </header>
              <div className="card-content card-body-armour">
                {materials && <p><strong>Materials:</strong> {materials}</p>}
                {colour && <p><strong>Colour:</strong> {colour}</p>}
                {outerwear && <p><strong>Outerwear:</strong> {outerwear}</p>}
                {layering && <p><strong>For layering:</strong> {layering}</p>}
              </div>
            </div>
          </div>

          <div className="column is-one-third">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">Take note!</p>
              </header>
              <div className="card-content">
                <p className="subtitle">{advice}</p>
              </div>
              <footer className="card-footer">
                <p className="card-footer-item">
                  {this.state.data && <span>{Math.floor(this.state.data.main.temp)}°C</span>}
                </p>
                <p className="card-footer-item">
                  <i className={icon}></i>
                </p>
              </footer>
            </div>
          </div>

        </div>

      </section>
    )
  }

}

export default WhatToWear
