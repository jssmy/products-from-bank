import { Observable } from "rxjs";
import { Product } from "../product";


export abstract class ProductGateway {
    abstract getAll(): Observable<Product[]>;
    abstract save(product: Product): Observable<Product>;
    abstract update(product: Product): Observable<Product>;
    abstract delete(id: string): Observable<string>;
    abstract exist(id: string): Observable<boolean>;
    abstract setSelectedProduct(product: Product): void;
    abstract getSelectedProduct(): Product;
}
