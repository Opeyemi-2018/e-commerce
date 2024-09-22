    import express from 'express'
    import { addItemToCart, getCart, deleteCart } from '../controllers/cartController.js'
    import { verifyToken } from '../utils/verifyToken.js'

    let router = express.Router()

    router.post('/additemtocart', verifyToken, addItemToCart)
    router.get('/getcart', verifyToken, getCart)
    router.delete('/deletecart/:productId', verifyToken, deleteCart )

    export default router