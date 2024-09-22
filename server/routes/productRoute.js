import express from 'express'
import { createProduct, getProducts, getProduct, getDashboardProduct, updateProduct, deleteProduct } from '../controllers/productsController.js'
import { verifyToken } from '../utils/verifyToken.js'

let router = express.Router()

router.post('/createproduct', verifyToken, createProduct)
router.get('/getproducts',  getProducts)
router.get('/dashboardProduct', verifyToken, getDashboardProduct)
router.get('/getproduct/:id',  getProduct)
router.put('/updateproduct/:id', verifyToken, updateProduct)
router.delete('/deleteproduct/:id', verifyToken, deleteProduct)

export default router