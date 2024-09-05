// src/controller/cart.controller.js

const Cart = require('../model/cart.model');
const Product = require('../model/product.model');
const Ticket = require('../model/ticket.model');
const { generateUniqueCode } = require('../utils/codeGenerator');

async function finalizePurchase(req, res) {
    const cartId = req.params.cid;
    const cart = await Cart.findById(cartId).populate('products.product');

    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    let totalAmount = 0;
    const unavailableProducts = [];

    // Verificación de stock
    for (const cartProduct of cart.products) {
        const product = cartProduct.product;
        if (product.stock >= cartProduct.quantity) {
            product.stock -= cartProduct.quantity;
            totalAmount += product.price * cartProduct.quantity;
            await product.save();
        } else {
            unavailableProducts.push(product._id);
        }
    }

    if (totalAmount > 0) {
        // Generar Ticket
        const ticket = new Ticket({
            code: generateUniqueCode(),
            amount: totalAmount,
            purchaser: req.user.email, // Email del comprador
        });
        await ticket.save();

        // Filtrar los productos no comprados
        cart.products = cart.products.filter((cartProduct) => unavailableProducts.includes(cartProduct.product._id));
        await cart.save();

        res.json({ message: 'Purchase completed', ticket, unavailableProducts });
    } else {
        res.json({ message: 'No products available for purchase', unavailableProducts });
    }
}

module.exports = { finalizePurchase };
