import React from 'react'
import {Link, withRouter} from 'react-router-dom'

function Nav(props) {
    return(
        <div className='nav-bar'>

        {/* here I am using props.history.push('/') this is a built in method from react-router-dom
        it adds a new path onto the history stack which in turn tells router that that is the current path we are supposed to be on
        it works almost like a link except we can use it in other places not just an onClick */}
            <h1 onClick={() => props.history.push('/')}>This Is A Store</h1>
            <div>
                <Link to='/'>Products</Link>
                <Link to='/cart'>Cart</Link>
            </div>
        </div>
    )
}

//if a route isn't directly being rendered by a route but you want access to the info put on the props object from react-router-dom, you must bring in withRouter and wrap the component
//if you don't use withRouter you won't have access to props.history, props.match, or props.location
//most of the time this is fine but in this case we are using props.history.push() so in order to use that we need withRouter
export default withRouter(Nav)