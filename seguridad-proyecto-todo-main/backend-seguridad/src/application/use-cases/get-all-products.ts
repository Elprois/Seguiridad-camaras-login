import { Product } from '../../domain/product';
import { ProductRepository } from '../ports/product.repository';

export class GetAllProducts {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(): Promise<Product[]> {
        return this.productRepository.findAll();
    }
}
