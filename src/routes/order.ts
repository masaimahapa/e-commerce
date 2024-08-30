import { Router } from 'express';
import { CartService } from '../services/CartService';
import { AuthRequest } from '../middleware/auth';

const router = Router();
const cartService = new CartService();

router.post('/cart/add', (req: AuthRequest, res) => {
    const { productId, quantity } = req.body;
    cartService.addToCart(productId, quantity);
    res.json({ message: "Product added to cart" });
});

router.post('/cart/remove', (req: AuthRequest, res) => {
    const { productId } = req.body;
    cartService.removeFromCart(productId);
    res.json({ message: "Product removed from cart" });
});

router.get('/cart', (req: AuthRequest, res) => {
    const cart = cartService.getCart();
    res.json(cart);
});

router.post('/checkout', async (req: AuthRequest, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const order = await cartService.checkout(req.user.userId);
        res.json({ message: "Order placed successfully", order });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: "An unexpected error occurred" });
        }
    }
});

export default router;