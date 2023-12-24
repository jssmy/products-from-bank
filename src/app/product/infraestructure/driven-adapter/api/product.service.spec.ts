import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product } from 'src/app/product/domain/models/product/product';
import { productsData } from 'src/app/product/UI/pages/products/products.component.spec';

describe('ProductService', () => {

  let httpTestingController: HttpTestingController;
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ HttpClientTestingModule ]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController)

  });
  
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('obtener todos os productos', () => {
    const mockProducts: Product[] = productsData;

    service.getAll().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpTestingController.expectOne(service['url']);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProducts);
  });

  it('guardar producto', () => {
    const [mockProduct] = productsData;

    service.save(mockProduct).subscribe(savedProduct => {
      expect(savedProduct).toEqual(mockProduct);
    });

    const req = httpTestingController.expectOne(service['url']);
    expect(req.request.method).toEqual('POST');
    req.flush(mockProduct);
  });


  it('eliminar producto', () => {
    const deleteResponse = {
      status: 200
    } as Response;
    spyOn(globalThis, 'fetch').and.returnValue(Promise.resolve(deleteResponse))
    const productID = 'tr-223';
    service.delete(productID).subscribe(response => {
      expect(response).toBe('Success');
    });

  });

  it('valida si un producto existe', () => {
    const productID = '123';

    service.exist(productID).subscribe(productExists => {
      expect(productExists).toBe(true); 
    });

    const req = httpTestingController.expectOne(`${service['url']}/verification?id=${productID}`);
    expect(req.request.method).toEqual('GET');
    req.flush(true); 
  });

});
