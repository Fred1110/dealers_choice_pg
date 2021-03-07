import React, { Component } from 'react';
import axios from 'axios';

class Location extends Component {
  constructor(){
    super();
    this.state = {
      location: {}
    }
  }

  async componentDidUpdate(prevProps){
    if(prevProps.selectedLocationId !== this.props.selectedLocationId){
      const location = (await axios.get(`/api/location/${this.props.selectedLocationId}`)).data;
      this.setState({ location });
    }
  }

  async componentDidMount(){
    const location = (await axios.get(`/api/location/${this.props.selectedLocationId}`)).data;
    this.setState({location})
  }
  render(){
    const {location} = this.state;
    return (
      <div>
        {location.scotch}
      </div>
    )
  }
}

export default Location;
