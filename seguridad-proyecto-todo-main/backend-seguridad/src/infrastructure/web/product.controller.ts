import { Request, Response } from 'express';
import { CreateProduct } from '../../application/use-cases/create-product';
import { GetProduct } from '../../application/use-cases/get-product';
import { GetAllProducts } from '../../application/use-cases/get-all-products';
import { UpdateProduct } from '../../application/use-cases/update-product';
import { DeleteProduct } from '../../application/use-cases/delete-product';
import { Product } from '../../domain/product';

export class ProductController {
    constructor(
        private readonly createProduct: CreateProduct,
        private readonly getProduct: GetProduct,
        private readonly getAllProducts: GetAllProducts,
        private readonly updateProduct: UpdateProduct,
        private readonly deleteProduct: DeleteProduct
    ) {}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const product = await this.createProduct.execute(req.body as Product);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error creating product' });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const product = await this.getProduct.execute(+req.params.id);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error finding product' });
        }
    }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const products = await this.getAllProducts.execute();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error finding products' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const product = await this.updateProduct.execute(+req.params.id, req.body as Partial<Product>);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating product' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const success = await this.deleteProduct.execute(+req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product' });
        }
    }
}
