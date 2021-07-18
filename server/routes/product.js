const express = require('express')
const router = express.Router()
const Product = require('../models/product')

//Geting all
router.get('/', async (req, res) => {
    try {
        const product = await Product.find()
        res.json(product)
    } catch(err) {
        res.status(500).res.json({ message: err.message })
    }
})

//Getting one
router.get('/:id', getProduct, (req, res) => {
    res.json(res.product)
})

//Creating one
router.post('/', async (req, res) => {
    const {name, qty, price} = req.body

    const product = new Product({
        name,
        qty,
        price
    })

    try {
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    } catch(err) {
        res.status(400).json({message : err.message})
    }
})

//Updating one
router.patch('/:id', getProduct, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.qty != null) {
        res.product.qty = req.body.qty
    }
    if (req.body.price != null) {
        res.product.price = req.body.price
    }
    try{
        const updatedProduct = await res.subscriber.save()
        res.json(updatedProduct)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

//Delete one
router.delete('/:id', getProduct, async (req, res) => {
    try {
        await res.product.remove()
        res.json({ message: 'Deleted product'})
    } catch(err) {
        res.status(500).json({ message: err.message})
    }
})

async function getProduct(req, res, next) {
    let product
    try {
        product = await Product.findById(req.params.id)
        if (product == null) {
            return res.status(404).json({ message: 'Cannot find product'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }

    res.product = product
    next()
}

module.exports = router