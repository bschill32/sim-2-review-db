import React, { Component } from 'react';
import './App.css';
import ProductsList from './components/ProductsList'
import Cart from './components/Cart'
import axios from 'axios'
import Nav from './components/Nav'

//we need to bring in connect in order to tell this component we want to access redux
//this needs to be brought in to every component you are planning on using data from redux
import {connect} from 'react-redux'

//need to bring in action creator function from redux so we can update the redux store
import {getProducts} from './ducks/reducer'

//I am bringing in withRouter here because App isn't being directly rendered by a route
//this causes all of the information normally put on the props object via react-router-dom to not be added
//therefore when we try to load other routes it won't work
//so I bring in withRouter to tell react-router-dom to add all that data to props so the routes can work properly
//this is only an issue on App.js/where you're rendering your routes when we are using redux/connect
import {Switch, Route, withRouter} from 'react-router-dom'

class App extends Component {

  //I am getting the products from the server when the App component mounts because this data is never going to change therefore we only need to get it one time
  //The App component is only going to load one time when the page first loads because it is the component everything is rendering inside of
  componentDidMount() {
    axios.get('/api/products').then(results => {
      this.props.getProducts(results.data)
    })
  }

  render() {
    return (
      <div>
        <Nav/>
        <Switch>
          <Route exact path='/' component={ProductsList} />
          <Route path='/cart' component={Cart} />
        </Switch>
      </div>
    );
  }
}

//connect expects it's first argument to be either a callback function or null
//if we are not subscribing to the store then we just pass in null otherwise we pass in a function such as mapStateToProps
//the second argument is optional but we want to use it here
//it is for when we are bringing in an action creator function from the reducer
//the second argument is expected as an object and it takes all the properties defined on the object and store them on the props object as whatever name you give it
//here we're just giving it the same name as when we defined the function but we could change it if we wanted to


//then if we are defining our routes in this component but the component is not being rendered by a route, we must wrap the component and connect with withRouter
//this gives the component access to all of the data from router allowing the routes to work
export default withRouter(connect(null, {getProducts})(App))
