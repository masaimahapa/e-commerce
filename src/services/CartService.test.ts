import { describe, expect, it } from 'vitest';
import { Cart } from './Cart';

describe('Cart', () => {
  it('adds quantities for the same product', () => {
    const cart = new Cart();

    cart.addToCart(7, 2);
    cart.addToCart(7, 3);

    expect(cart.getCart()).toEqual([{ productId: 7, quantity: 5 }]);
  });

  it('removes a product from the cart', () => {
    const cart = new Cart();

    cart.addToCart(7, 1);
    cart.removeFromCart(7);

    expect(cart.getCart()).toEqual([]);
  });
});
