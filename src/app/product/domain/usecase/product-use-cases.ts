import { Inject, Injectable } from "@angular/core";
import { ProductGateway } from "../models/product/gateway/product-gateway";
import { Product } from "../models/product/product";
import { ProductService } from "../../infraestructure/driven-adapter/api/product.service";

@Injectable({
    providedIn: 'root'
})
export class ProductUseCase {
    constructor(
    
        private productGateway: ProductGateway
    ) { }

    getAll() {
        return this.productGateway.getAll();
    }
    save(product: Product) {
        return this.productGateway.save(product);
    }

    getByName(name: string) {
        return this.getAll();
    }

}