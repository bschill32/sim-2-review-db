import React from 'react'
import {Link, withRouter} from 'react-router-dom'

function Nav(props) {
    return(
        <div className='nav-bar'>
            <h1 onClick={() => props.history.push('/')}>This Is A Store</h1>
            <div>
                <Link to='/'>Products</Link>
                <Link to='/cart'>Cart</Link>
            </div>
        </div>
    )
}

export default withRouter(Nav)