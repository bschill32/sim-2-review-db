//creating our initial values for our global state/redux store
//the data we need access to across multiple views is what we want to store here
let initialState = {
    products: [],
    cart: []
}

//set up constant variables set equal to a string of our action types
//we do this in order to have a variable stored that we can refer to
//if we misspell the variable when using it later it will throw an error saying the misspelled variable is not definied
//if we don't use variables and just use the string in the reducer/action creator functions and we misspell it, it won't throw an error
//it will just never find a matching action type in the reducer's switch statement and end up hitting the default and just returning state
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_CART = 'GET_CART'

//the reducer takes in state and an action
//state refers to the initial state object defined above and updates it throughout the whole time using redux
//actions are created in the functions defined below
//each action has a type and a payload
//the reducer has a switch statement to check the type of the action passed in
//for each action type the reducer will return a copy of state with a certain property being updated
//there are two ways to return a copy of state
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_PRODUCTS: 
        //1. Object.assign() which takes an empty object, state, and a new object with the specific property/properties that you want updates
        //Object.assign() basically takes the first argument(an empty object) and adds everything from the second argument(state) into it
        //it then takes and adds all of the properties of the third argument into the first as well
        //if there are any properties that are the same between all the arguments, then the last one to be added will overwrite all the others
        return Object.assign({}, state, {products: action.payload})
        case GET_CART: 
        //2. You can also use the spread operator
        //to do this you just create a new object then put 3 dots in front of state (or any other object you want to spread)
        //this tells js to take all of the properties from the state object, pull them off of state, and just add them as a property on this new object
        //then we can add properties to the new object and if the property we are adding already exists then it will just overwrite the old value of the property
            return {...state, cart: action.payload}
        //all switch statements should have a default case just in case it doesn't match any of the other expected cases
        //for a reducer the default case should always just return state
        default: 
            return state
    }
}

//action creators always return an object with a type attached to it
//this type should refer to the constant variables defined at the top of the file
//the returned object can also contain a payload which is all the data you want to pass along to the reducer to update state with
//you do not have to include a payload if you aren't passing any data along
export function getProducts(products) {
    return {
        type: GET_PRODUCTS,
        payload: products
    }
}
export function getCart(cart) {
    return {
        type: GET_CART,
        payload: cart
    }
}

//if we have time in class I will show you how to use axios calls in your reducer
//if we don't get to that then look up something called redux-promise-middleware
