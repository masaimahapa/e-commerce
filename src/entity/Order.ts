
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { OrderItem } from "./OrderItem";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.orders)
    user!: User;

    @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
    orderItems!: OrderItem[];

    @Column("float")
    totalAmount!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @Column({ default: 'pending' })
    status!: 'pending' | 'completed' | 'cancelled';
}

