const Product = require('../../Models/Product');
const { validationResult } = require('express-validator');
const Profile = require('../../Models/Profile');

// Create a new product
const createProduct = async (req, res) => {
    const { title, image, unitPrice, category, type, description } = req.body;
    const userId = req.user.id;
  
    try {
      // Check if the user's profile is of type 'Seller'
      const profile = await Profile.findOne({ user:userId });
      if (!profile || profile.type !== 'Seller') {
        return res.status(403).json({ msg: 'Only Seller profiles can create products' });
      }
  
      // Create the product
      const product = new Product({
        title,
        image,
        unitPrice,
        seller: userId,
        category,
        type,
        description,
      });
  
      await product.save();
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('seller', ['username', 'email']);
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', ['username', 'email']);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Update product
const updateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { title, image, unitPrice, category, type, description } = req.body;
  
    try {
      let product = await Product.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }
  
      // Check if user is admin or product owner
      if (req.user.role !== 'Admin' && product.seller.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      product.title = title || product.title;
      product.image = image || product.image;
      product.unitPrice = unitPrice || product.unitPrice;
      product.category = category || product.category;
      product.type = type || product.type;
      product.description = description || product.description;
  
      await product.save();
      res.json({ msg: 'Product updated successfully', product });
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Product not found' });
      }
      res.status(500).send('Server Error');
    }
  };
  
  // Delete product
  const deleteProduct = async (req, res) => {
    try {
      let product = await Product.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }
  
      // Check if user is admin or product owner
      if (req.user.role !== 'Admin' && product.seller.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      await product.remove();
      res.json({ msg: 'Product removed' });
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Product not found' });
      }
      res.status(500).send('Server Error');
    }
  };

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
