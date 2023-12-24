import { Injectable } from "@angular/core";
import { ProductGateway } from "../models/product/gateway/product-gateway";
import { Product } from "../models/product/product";

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

    update(product: Product) {
        return this.productGateway.update(product);
    }

    delete(id: string)  {
        return this.productGateway.delete(id);
    }

    exist(id: string)  {
        return this.productGateway.exist(id);
    }

    setSelectedProduct(product: Product) {
        this.productGateway.setSelectedProduct(product);
    }

    getSelectedProduct() {
        return this.productGateway.getSelectedProduct();
    }

}