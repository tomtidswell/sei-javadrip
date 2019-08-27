import React from 'react'
import Auth from '../lib/Auth'
import axios from 'axios'

class Settings extends React.Component {
  constructor(){
    super()
    this.setCity = this.setCity.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.confirmPostcode = this.confirmPostcode.bind(this)

    if(!Auth.isUser()){
      console.log('No user')
      Auth.setUserData({ city: 'London', postcode: '' })
    }
    this.userData = Auth.getUserData()
    this.userData.postcode = this.userData.postcode || ''

    //initialise the state with these variables
    this.state = { data: { ...this.userData }, errors: {} }
  }

  setCity(e){
    console.log(e.target.value)
    Auth.setUserData({ city: e.target.value })
    this.setState({ data: {...this.state.data, city: e.target.value }})
  }

  handleChange({ target: { name, value }}){
    const data = {...this.state.data, [name]: value }
    this.setState({ data, errors: {} })
    //console.log(data)
  }

  confirmPostcode(e){
    e.preventDefault()
    if(!this.state.data.postcode || this.state.data.postcode === ' ') return null
    axios.get(`https://api.postcodes.io/postcodes/${this.state.data.postcode}`)
      .then(res => {
        // console.log(res.data)
        Auth.setUserData({ postcode: this.state.data.postcode, lon: res.data.result.longitude, lat: res.data.result.latitude })
        this.props.history.push('/')
      })
      .catch(err => this.setState({ errors: { postcode: err } }))
  }

  render(){
    this.userData.city
    console.log('data', this.state.data, this.state.errors)
    return (
      <main className="settings-page">
        <h1 className="title">Set your location and preferences</h1>
        <section className="section register">

          <div className="field">
            <p className="control has-icons-left">
              <span className="select">
                <select defaultValue={Auth.getUserData().city || 'London'} onChange={this.setCity}>
                  <option>London</option>
                  <option>Manchester</option>
                  <option>Leeds</option>
                  <option>Bristol</option>
                  <option>Glasgow</option>
                </select>
              </span>
              <span className="icon is-small is-left">
                <i className="fas fa-globe"></i>
              </span>
            </p>
          </div>

          <div className="field">
            <p className="control has-icons-left">
              <input
                className={`input ${this.state.errors.postcode ? 'is-danger' : '' }`}
                placeholder="Postcode"
                type="text"
                value={this.state.data.postcode.toUpperCase()}
                name="postcode"
                onChange={this.handleChange}/>
              <span className="icon is-small is-left">
                <i className="fas fa-map-marker-alt"></i>
              </span>
              {this.state.errors.postcode && <small className="help is-danger">The postcode could not be found</small>}
            </p>
          </div>
          <button className="button is-info" onClick={this.confirmPostcode}>Save</button>

        </section>
      </main>
    )
  }
}
export default Settings
