require('dotenv').config()

const express = require('express')
    , bodyParser = require('body-parser')
    , controller = require('./controller')
    , massive = require('massive')

const app = express();

const { SERVER_PORT, CONNECTION_STRING} = process.env

app.use(bodyParser.json())

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('connected')
})

app.get('/api/products', controller.getProducts)

app.get('/api/cart', controller.getCart)
app.post('/api/cart/:id', controller.addToCart)
app.put('/api/cart/:id', controller.updateQuantity)
app.delete('/api/cart/checkout', controller.checkout)
app.delete('/api/cart/:id', controller.deleteItem)

app.listen(SERVER_PORT, () => console.log('You are who you chose to be', SERVER_PORT))
