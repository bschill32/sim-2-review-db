import React from 'react'
import Product from './Product'
import {connect} from 'react-redux'

function ProductsList(props) {
    let products = props.products.map( e => {
        return (
            <Product product={e} key={e.id}/>
        )
    })
    return (
        <div>
            <h1>Products</h1>
            {products}
        </div>
    )
}

//when we want to access data from state we have to create this function to do it
//mapStateToProps expects state to be passed in (redux does this behind the scenes) and then we just return an object with the properties of what we want from redux
//in our returned object we can name those properties whatever we want 
//for instance I can call it smashmouth instead of products as long as I make sure it's value is coming from the right place in state (state.products in this instance)
function mapStateToProps(state) {
    return {
        products: state.products
    }
}

//we then pass mapStateToProps into connect where redux does some magic and adds all of the info we've subscribed to onto the props object of this component
export default connect(mapStateToProps)(ProductsList)