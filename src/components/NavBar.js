import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../lib/Auth'

class NavBar extends Component{
  constructor(){
    super()
    this.state = {}
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  toggleNavbar(){
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  //be careful with this - if we set state from this, it can end up in a loop
  componentDidUpdate(prevProps){
    //console.log('before and after', prevProps.location.pathname, this.props.location.pathname)
    //if we move pages, ensure that the navigation bar closes
    if(prevProps.location.pathname !== this.props.location.pathname){
      this.setState({ navbarOpen: false })
    }
  }

  logout(){
    Auth.deleteUser()
    this.props.history.push('/settings')
  }

  render(){
    //console.log('Nav props', this.props)
    //console.log(Auth.getTokenPayload())
    return (
      <nav className="navbar is-transparent">
        <div className="navbar-brand">
          <a role="button"
            className={`navbar-burger ${this.state.navbarOpen ? 'is-active' : ''}`}
            onClick={this.toggleNavbar}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {this.props.location.pathname === '/settings' && <Link to="/" className="button is-success">Plan your day</Link>}
                <Link to="/settings" className="is-success button">Settings</Link>
                {Auth.isUser() && <a className="is-success button" onClick={()=>{
                  this.logout()
                }}
                >Switch user</a>}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
// provides the router prompts via withRouter
export default withRouter(NavBar)

//{ Auth.isToken() ? 'Logged in' : 'Please Register' }
