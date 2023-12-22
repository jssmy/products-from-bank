import { Component, OnInit } from '@angular/core';
import { ProductUseCase } from '../../../domain/usecase/product-use-cases';
import { Product } from '../../../domain/models/product/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  providers: [],
  imports: [
    CommonModule
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private productUseCase: ProductUseCase
  ) { }

  ngOnInit(): void {
    this.productUseCase.getAll()
    .subscribe(product => this.products = product);
  }
}
