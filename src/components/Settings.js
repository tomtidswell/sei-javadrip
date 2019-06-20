import React from 'react'
import Auth from '../lib/Auth'

class Settings extends React.Component {
  constructor(){
    super()
  }

  setCity(e){
    console.log(e.target.value)
    Auth.setUserData({ city: e.target.value })
  }

  render(){
    const userData = Auth.getUserData()
    const chosenCity = userData ? userData.city : null
    if(!chosenCity) Auth.setUserData({ city: 'London' })
    console.log('chosen city', chosenCity)
    return (
      <main>
        <section className="section register">
          <h1 className="title">Set your location and preferences</h1>
          <div className="field">
            <p className="control has-icons-left">
              <span className="select">
                <select defaultValue={chosenCity} onChange={this.setCity}>
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
        </section>
      </main>
    )
  }
}
export default Settings
