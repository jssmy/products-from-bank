import { Injectable } from '@angular/core';
import { ProductGateway } from '../../../domain/models/product/gateway/product-gateway';
import { Observable } from 'rxjs';
import { Product } from '../../../domain/models/product/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ProductGateway {
  private authorId = '23232323';
  private url = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';
  private selectedProduct: Product;
  constructor(
    private readonly http: HttpClient
  ) {
    super();
  }

  override getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url, { headers: this.getHeaders() });
  }

  override save(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product, { headers: this.getHeaders() });
  }


  override delete(id: string): Observable<string> {
    return new Observable<string>((observer) => {
      fetch(`${this.url}?id=${id}`, {
        method: 'delete',
        headers: {
          'authorId': this.authorId
        }
      })
        .then(res => {
          if (res.status === 200) {
            observer.next('Success');
          } else {
            observer.error('error');
          }
        })
        .catch(err => observer.error(err));
    });
  }

  override exist(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/verification?id=${id}`, { headers: this.getHeaders() });
  }

  override setSelectedProduct(product: Product) {
    this.selectedProduct = product;    
  }

  override getSelectedProduct(): Product {
    return this.selectedProduct;
  }

  override update(product: Product): Observable<Product> {
    return this.http.put<Product>(this.url, product, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return (new HttpHeaders())
      .set('authorId', this.authorId);
  }


}
