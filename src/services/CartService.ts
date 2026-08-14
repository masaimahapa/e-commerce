import { Product } from "../entity/Product";
import { User } from "../entity/User";
import { Order } from "../entity/Order";
import { OrderItem } from "../entity/OrderItem";
import { AppDataSource } from '../data-source';
import { Cart } from './Cart';

export class CartService extends Cart {
    async checkout(userId: number) {
        const userRepository =  AppDataSource.getRepository(User);
        const productRepository = AppDataSource.getRepository(Product);
        const orderRepository = AppDataSource.getRepository(Order);

        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error("User not found");
        }

        const order = new Order();
        order.user = user;
        order.orderItems = [];
        order.totalAmount = 0;

        for (const [productId, quantity] of this.items) {
            const product = await productRepository.findOne({ where: { id: productId } });
            if (!product) {
                throw new Error(`Product with id ${productId} not found`);
            }

            if (product.inventoryCount < quantity) {
                throw new Error(`Not enough stock for product ${product.name}`);
            }

            const orderItem = new OrderItem();
            orderItem.product = product;
            orderItem.quantity = quantity;
            orderItem.price = product.price;

            order.orderItems.push(orderItem);
            order.totalAmount += product.price * quantity;
            product.inventoryCount -= quantity;
            await productRepository.save(product);
        }

        await orderRepository.save(order);

        this.clearCart();

        return order;
    }
}
