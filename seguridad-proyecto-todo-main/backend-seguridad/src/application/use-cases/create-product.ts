import { Product } from '../../domain/product';
import { ProductRepository } from '../ports/product.repository';

export class CreateProduct {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(product: Product): Promise<Product> {
        return this.productRepository.create(product);
    }
}
