import React from 'react';
import { motion } from 'framer-motion';
import { RiDeleteBinLine } from 'react-icons/ri';

const CartPage = () => {
  const items = [
    { id: 1, title: 'Product A', unitPrice: 20, quantity: 2 },
    { id: 2, title: 'Product B', unitPrice: 30, quantity: 1 },
    { id: 3, title: 'Product C', unitPrice: 25, quantity: 3 },
  ];

  const taxRate = 0.08; // Example tax rate

  const calculateSubtotal = () => {
    return items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * taxRate;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const removeFromCart = (itemId) => {
    // Implement logic to remove item from cart
    console.log('Removing item with ID:', itemId);
  };

  return (
    <div className="bg-gray-900 text-white h-screen py-16">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-green-500 mb-8 text-center">Shopping Cart</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 shadow-md rounded-lg p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-400">${item.unitPrice} each</p>
                <p className="mt-2">Quantity: {item.quantity}</p>
                <p className="text-gray-400">ID: {item.id}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="flex items-center text-red-500 mt-4 focus:outline-none"
              >
                <RiDeleteBinLine className="mr-2" />
                Remove
              </button>
            </motion.div>
          ))}
        </div>
        <div className="mt-8">
          <div className="flex justify-between mb-4">
            <div className="text-gray-400">Subtotal:</div>
            <div className="text-gray-400">${calculateSubtotal().toFixed(2)}</div>
          </div>
          <div className="flex justify-between mb-4">
            <div className="text-gray-400">Tax ({(taxRate * 100).toFixed(2)}%):</div>
            <div className="text-gray-400">${calculateTax().toFixed(2)}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-lg font-bold">Total:</div>
            <div className="text-lg font-bold">${calculateTotal().toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
