import { Product } from '../../domain/product';
import { ProductRepository } from '../ports/product.repository';

export class UpdateProduct {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(id: number, product: Partial<Product>): Promise<Product | null> {
        return this.productRepository.update(id, product);
    }
}
