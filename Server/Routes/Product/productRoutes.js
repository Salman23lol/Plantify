const express = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../../Uitls/authMiddleware');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../../Controllers/product/productController');

const productRouter = express.Router();

// Create product
productRouter.post(
  '/',
  authMiddleware,
  [
    body('title').not().isEmpty().trim().escape(),
    body('image').not().isEmpty().isURL(),
    body('unitPrice').isNumeric(),
    body('category').not().isEmpty().trim().escape(),
    body('type').not().isEmpty().trim().escape(),
    body('description').not().isEmpty().trim().escape()
  ],
  createProduct
);

// Get all products
productRouter.get('/', getAllProducts);

// Get product by ID
productRouter.get('/:id', getProductById);

// Update product
productRouter.put(
  '/:id',
  authMiddleware,
  [
    body('title').optional().not().isEmpty().trim().escape(),
    body('image').optional().not().isEmpty().isURL(),
    body('unitPrice').optional().isNumeric(),
    body('category').optional().not().isEmpty().trim().escape(),
    body('type').optional().not().isEmpty().trim().escape(),
    body('description').optional().not().isEmpty().trim().escape()
  ],
  updateProduct
);

// Delete product
productRouter.delete('/:id', authMiddleware, deleteProduct);

module.exports = productRouter;
