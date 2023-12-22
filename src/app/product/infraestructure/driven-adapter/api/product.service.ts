import { Injectable } from '@angular/core';
import { ProductGateway } from '../../../domain/models/product/gateway/product-gateway';
import { Observable, tap } from 'rxjs';
import { Product } from '../../../domain/models/product/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ProductGateway {

  private url = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';
  constructor(
    private readonly http: HttpClient
  ) {
    super();
  }

  override getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url, { headers: this.getHeaders() }).pipe(
      tap(rs => console.log(rs))
    )
  }

  override save(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return (new HttpHeaders())
      .set('authorId', '23232323');
  }
}
