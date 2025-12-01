import { Product } from '../../domain/product';

export interface ProductRepository {
    create(product: Product): Promise<Product>;
    findById(id: number): Promise<Product | null>;
    findAll(): Promise<Product[]>;
    update(id: number, product: Partial<Product>): Promise<Product | null>;
    delete(id: number): Promise<boolean>;
}
