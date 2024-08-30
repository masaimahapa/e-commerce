import { Router } from 'express';
import { User } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import { AppDataSource } from '../index';

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = userRepository.create(req.body as User);
        await userRepository.save(user);
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error creating user" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { username } });

        if (!user || !(await user.validatePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user.id }, 'my_strong_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error during login" });
    }
});

export default router;