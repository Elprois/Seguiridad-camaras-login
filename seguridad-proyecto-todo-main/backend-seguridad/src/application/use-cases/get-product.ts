import { Product } from '../../domain/product';
import { ProductRepository } from '../ports/product.repository';

export class GetProduct {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(id: number): Promise<Product | null> {
        return this.productRepository.findById(id);
    }
}
