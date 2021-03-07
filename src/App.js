import axios from 'axios';
import React, { Component } from 'react';
import Location from './Location';

class App extends Component {
  constructor(){
    super();
    this.state = {
      location: [],
      selectedLocationId: ''
    }
  }
  async componentDidMount(){
    const location = (await axios.get('/api/location')).data;
    this.setState({location});
    window.addEventListener('hashchange', () => {
      this.setState({selectedLocationId: window.location.hash.slice(1)});
    })
    this.setState({selectedLocationId: window.location.hash.slice(1)});
  }
  render(){
    const { location, selectedLocationId } = this.state;
    return (
      <div>
        <h1>Scotch & Their Locations</h1>
        <ul>
          <h2><a href='/'>Locations</a></h2>
          {
            location.map(location => {
              return (
                <li className={ selectedLocationId === location.id ? 'selected': ''} key={location.id}>
                  <a href={`#${location.id}`}>
                    {location.name}
                  </a>
                </li>
              )
            })
          }
        </ul>
        <div>
          {
            !!selectedLocationId && <Location selectedLocationId={selectedLocationId}/>
          }
        </div>
      </div>
    )
  }
}

export default App;
