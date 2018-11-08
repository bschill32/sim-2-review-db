module.exports = {
    getProducts: (req, res) => {
        const db = req.app.get('db')
        db.get_products().then(products => {
            res.status(200).send(products)
        })
    },
    getCart: (req, res) => {
        const db = req.app.get('db')
        db.get_cart().then(cart => {
            res.status(200).send(cart)
        })
    },
    addToCart: (req, res) => {
        const db = req.app.get('db')
        let {id} = req.params
        db.get_cart().then(cart => {
            //grabbing the entire cart and then checking if an item is in there
            //we could also do this by creating an sql query that selects all items with a matching product_id
            //then check to see if the array returned has a length, if it has a length then the product is in the cart
            let index = cart.findIndex(d => d.id === +id)

            //if the product isn't in the cart we just simply add it
            if(index === -1) {
                db.add_to_cart(id).then(cart => {
                    res.status(200).send(cart)
                })
            } else {
                //if it is in the cart then we just increment the quantity then update it for that product in the database
                //this makes it so we don't have duplicate items in the db
                let quantity = cart[index].quantity + 1
                db.update_quantity(id, quantity).then(cart => {
                    res.status(200).send(cart)
                })
            }
        })
    },
    updateQuantity: (req, res) => {
        const db = req.app.get('db')
        let {id} = req.params

        //we are calculating the quantity on the frontend and just sending it to the back
        //this allows us to not have to do any of the logic on the backend and just simply update the quantity

        //you could send the quantity across any way you want, I chose to do a query to give you an example of how to set up a query on the backend
        //so we destructure quantity from req.query then do a check to see if query is truthy
        //when you send something as a query it comes across as a string therefore 0 which is normally falsey will be '0' which is truthy
        let {quantity} = req.query
        if(quantity) {

            //we then check to see if quantity is equal to
            //if it is then delete the product from the cart table
            if(+quantity === 0) {
                db.delete_item(id).then(cart => {
                    res.status(200).send(cart)
                })
            } else {
                //if it isn't equal to zero then just update the quantity on the table
                db.update_quantity(id, quantity).then(cart => {
                    res.status(200).send(cart)
                })
            }
        } else {
            res.status(500).send('Why you no send quantity?!')
        }
    },
    deleteItem: (req, res) => {
        const db = req.app.get('db')
        let {id} = req.params
        db.delete_item(id).then(cart => {
            res.status(200).send(cart)
        })
    },
    checkout: (req, res) => {
        const db = req.app.get('db')
        db.checkout().then(cart => {
            res.status(200).send(cart)
        })
    }
}