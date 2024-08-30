import { Router } from 'express';
import { Product } from '../entity/Product';
import {AppDataSource} from "../index";

const router = Router();

router.post('/', async (req, res) => {
    try {
        const productRepository = AppDataSource.getRepository(Product);
        const product = productRepository.create(req.body as Product);
        await productRepository.save(product);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: "Error creating product" });
    }
});

router.get('/', async (req, res) => {
    try {
        const productRepository = AppDataSource.getRepository(Product);
        const products = await productRepository.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
    }
});

router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        if (!query || typeof query !== 'string') {
            return res.status(400).json({ message: "Search query is required" });
        }

        const productRepository = AppDataSource.getRepository(Product);
        const products = await productRepository.createQueryBuilder("product")
            .where("product.name LIKE :query OR product.description LIKE :query", { query: `%${query}%` })
            .getMany();

        res.json(products);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Error searching products", error: error.message });
        } else {
            res.status(500).json({ message: "An unexpected error occurred" });
        }
    }
});

router.get('/:id', async (req, res) => {
    try {
        const productRepository = AppDataSource.getRepository(Product);
        const product = await productRepository.findOne({ where: { id: parseInt(req.params.id) } });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const productRepository = AppDataSource.getRepository(Product);
        let product = await productRepository.findOne({ where: { id: parseInt(req.params.id) } });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        productRepository.merge(product, req.body as Product);
        await productRepository.save(product);
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: "Error updating product" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const productRepository = AppDataSource.getRepository(Product);
        const product = await productRepository.findOne({ where: { id: parseInt(req.params.id) } });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await productRepository.remove(product);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error deleting product" });
    }
});



export default router;