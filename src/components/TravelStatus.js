import React, { Component }  from 'react'
import axios from 'axios'

class TravelStatus extends Component{
  constructor(){
    super()
    this.state = { data: null, load: false }
  }

  componentDidUpdate(){
    //if we are not set to load, dont!
    if(!this.state.load) return
    //if we already have data, dont load it again
    if(this.state.data) return

    //go ahead and fetch the data from the API
    axios.get('https://api.tfl.gov.uk/line/mode/tube/status')
      .then(({ data }) => {
        console.log(data)
        this.setState({ data })
      })
      .catch(err => console.log(err))

    //default the data
    //this.setState({ travel: { status: 'Good service' }, data: true })
  }

  clickedLine({ currentTarget }){
    currentTarget.classList.toggle('active')
  }

  toggleComponent(){
    this.setState({ load: !this.state.load })
  }

  render(){
    console.log('Data at render:',this.state.data)

    // Initial state - pre API load
    if(!this.state.load) return (
      <a className="button is-large initial"
        onClick={()=>this.toggleComponent()}>
        Public transport
      </a>
    )

    // API loading state
    if(!this.state.data) return (
      <p className="button is-large initial is-loading"></p>
    )

    // Completed state - show travel
    return (
      <section className="section travel-status">
        <a role="button" className="navbar-burger is-active close" onClick={()=>this.toggleComponent()}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
        <h2>Public transport</h2>
        <div className="card">
          {this.state.data.map(tube => {
            const status = tube.lineStatuses[0].statusSeverityDescription
            const disruption = tube.lineStatuses[0].reason
            return (
              <article
                key={tube.id}
                onClick={this.clickedLine}
                className={status === 'Good Service' ? 'good-status' : 'other-status'}>
                <h3>{tube.name}</h3>
                <p>{status}</p>
                <small>{status === 'Good Service' ? 'The line is operating normally' : disruption}</small>
              </article>
            )
          })}
        </div>
      </section>
    )
  }

}

export default TravelStatus
