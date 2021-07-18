require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect(process.env.DATABASE_URL, 
    { useNewUrlParser: true, 
        useUnifiedTopology: true 
    })

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(cors())
app.use(express.json())

const productRouter = require('./routes/product')
app.use('/products', productRouter)

app.listen(3001, () => console.log('Server Started'))