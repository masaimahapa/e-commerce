import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Order } from './entity/Order';
import { OrderItem } from './entity/OrderItem';
import { Product } from './entity/Product';
import { User } from './entity/User';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: [Product, User, Order, OrderItem],
  synchronize: true,
  logging: false,
});
