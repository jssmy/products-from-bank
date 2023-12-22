import { Observable } from "rxjs";
import { Product } from "../product";
import { Injectable } from "@angular/core";


export abstract class ProductGateway {
    abstract getAll(): Observable<Product[]>;
    abstract save(product: Product): Observable<Product>;
}
