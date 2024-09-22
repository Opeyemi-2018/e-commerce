import { Product } from "../models/productsModel.js";
import { errorHandler } from "../utils/error.js";

export let createProduct = async (req, res, next) => {
    // Check if user is authenticated and is an admin
    if (!req.user || !req.user.isAdmin) {
        return next(errorHandler(403, 'Only an admin can create a product'));
    }
    // Extract product details from request body
    let { name, description, price, imageUrls } = req.body;

    // Validate required fields
    if (!name || !description || !price || !imageUrls) {
        return next(errorHandler(400, 'All fields are required'));
    }
    try {
        // Attempt to save the new product to the database
        const createdProduct = await Product.create({ name, description, price, imageUrls });
        // If successful, respond with a 201 Created status and the created product data
       return res.status(201).json(createdProduct);
    } catch (error) {
        // If an error occurs during the save process, pass the error to the next middleware (likely an error handler)
        next(error);
    }
};

export let getProducts = async (req, res, next) => {
    try {
        let searchTerm = req.query.searchTerm || '';
        let query = searchTerm ? { name: { $regex: searchTerm, $options: 'i' } } : {};
        let products = await Product.find(query)
        return res.status(200).json(products) 
    } catch (error) {
        next(error)
    }
}



export let getProduct = async (req, res, next) => {
    try {
        let {id} = req.params
        let product = await Product.findById(id)
        if(!product) {
            return next(errorHandler(404, 'product not found'))
        }
      return  res.status(201).json(product)
    } catch (error) {
        next(error)
    }
}


//get admin dashboard product

export let getDashboardProduct = async (req, res, next) => {
    if(!req.user.isAdmin){
        return next(errorHandler(401, 'You are not authorized'))
    } 
    try {
        let product = await Product.find({})
        if(!product){
            return next(errorHandler(404, 'no product found'))
        }
       return res.status(200).json(product)
    } catch (error) {
        next(error)
    }
}

export let updateProduct = async (req, res, next) => {
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'you can not update this post'))
    }
    // if(req.user.id !== req.params.id){
    //     return next(errorHandler(401, 'you are not authorized'))
    // }

    let product = await Product.findById(req.params.id);
    if(!product) {
        return next(errorHandler(404, 'product not found'))
    }

    try {
        let updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
        );
        
        return res.status(200).json(updatedProduct)
    } catch (error) {
        next(error)
    }

}

export let deleteProduct = async (req, res, next) => {
    try {
      let productId = req.params.id; // Extract the ID from the request parameters
  
      // Check if the product exists
      let product = await Product.findById(productId);
      if (!product) {
        return next(errorHandler(404, 'Product not found'));
      }
  
      // Check if the user is an admin
      if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You cannot delete this product'));
      }
  
      // Delete the product
      let deletedProduct = await Product.findByIdAndDelete(productId);
      return res.status(200).json(deletedProduct);
  
    } catch (error) {
      // Handle unexpected errors
      return next(errorHandler(500, 'Server error'));
    }
  }
  