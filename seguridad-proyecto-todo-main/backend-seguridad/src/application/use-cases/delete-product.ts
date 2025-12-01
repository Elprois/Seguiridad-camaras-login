import { ProductRepository } from '../ports/product.repository';

export class DeleteProduct {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(id: number): Promise<boolean> {
        return this.productRepository.delete(id);
    }
}
