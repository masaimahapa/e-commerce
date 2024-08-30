import "reflect-metadata";
import express from 'express';
import { DataSource } from "typeorm";
import { Product } from './entity/Product';
import { User } from './entity/User';
import { Order } from './entity/Order';
import { OrderItem } from './entity/OrderItem';
import productRoutes from './routes/product';
import userRoutes from './routes/user';
import orderRoutes from './routes/order';
import { authMiddleware } from './middleware/auth';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [Product, User, Order, OrderItem],
    synchronize: true,
    logging: false
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");

        app.use('/users', userRoutes);
        app.use('/products', authMiddleware, productRoutes);
        app.use('/orders', authMiddleware, orderRoutes);

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });