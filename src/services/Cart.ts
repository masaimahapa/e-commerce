export class Cart {
  protected readonly items = new Map<number, number>();

  addToCart(productId: number, quantity: number) {
    const currentQuantity = this.items.get(productId) || 0;
    this.items.set(productId, currentQuantity + quantity);
  }

  removeFromCart(productId: number) {
    this.items.delete(productId);
  }

  getCart() {
    return Array.from(this.items, ([productId, quantity]) => ({
      productId,
      quantity,
    }));
  }

  protected clearCart() {
    this.items.clear();
  }
}
