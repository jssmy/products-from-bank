import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductGateway } from 'src/app/product/domain/models/product/gateway/product-gateway';
import { ProductService } from 'src/app/product/infraestructure/driven-adapter/api/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductUseCase } from 'src/app/product/domain/usecase/product-use-cases';
import { ModalService } from 'src/app/commons/services/modal.service';
import { of } from 'rxjs';
import { Product } from 'src/app/product/domain/models/product/product';
import { ComponentRef } from '@angular/core';
import { AlertComponent } from 'src/app/commons/UI/alert/alert.component';
export const productsData: Product[] = [
  {
    "id": "454545",
    "name": "actualizado",
    "description": "WEWEWEWEWEE",
    "logo": "https://estado.lamula.pe/media/uploads/f3399b67-2dc5-4c58-96f5-19783995ce36.jpg",
    "date_release": "2023-12-23T00:00:00.000+00:00",
    "date_revision": "2024-12-23T00:00:00.000+00:00"
  },
  {
    "id": "sdsd2323",
    "name": "343434343sdsdsd",
    "description": "34343434343ddsd",
    "logo": "https://estado.lamula.pe/media/uploads/f3399b67-2dc5-4c58-96f5-19783995ce36.jpg",
    "date_release": "2023-12-31T00:00:00.000+00:00",
    "date_revision": "2024-12-31T00:00:00.000+00:00"
  }
];

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productUseCase: ProductUseCase;
  let modal: ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductsComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ProductGateway,
          useClass: ProductService
        },
        Router,
        ProductUseCase,
        ModalService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productUseCase = TestBed.inject(ProductUseCase);
    modal = TestBed.inject(ModalService);

    spyOn(productUseCase, 'getAll').and.returnValue(of(productsData));

    fixture.detectChanges();
  });

  it('should create', () => {
    const productsRow = fixture.debugElement.nativeElement.querySelector('table > tbody > tr');
    expect(productsRow).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('seleccionar un producto para eliminar', () => {
    const dropdown = fixture.debugElement.nativeElement.querySelector('table > tbody > tr:nth-child(1) > td:nth-child(6) > app-dropdown');
    dropdown.click();
    const [firstProduct] = productsData;

    expect(component.productSelected).toBe(firstProduct);
    spyOn(productUseCase, 'delete').and.returnValue(of('success deleted'));

    /// eliminar el producto seleccionado 
    const reference = {
      instance: {
        onDismis: of(true)
      },
      destroy: () => {}
    };

    spyOn(modal, 'open').and.returnValue(reference as ComponentRef<AlertComponent>);
    const optionDelete = (dropdown as Element).querySelectorAll('.dropdown-menu > .dropdown-item').item(1);
    optionDelete.dispatchEvent( new Event('click'));
    expect(productUseCase.delete).toHaveBeenCalledWith('454545');

  });

  it('seleccionar un producto para editar', () => {
    const dropdown = fixture.debugElement.nativeElement.querySelector('table > tbody > tr:nth-child(1) > td:nth-child(6) > app-dropdown');
    dropdown.click();
    const [firstProduct] = productsData;

    expect(component.productSelected).toBe(firstProduct);

    /// eliminar el producto seleccionado 
    const reference = {
      instance: {
        onDismis: of(true)
      },
      destroy: () => {}
    };
    spyOn(modal, 'open').and.returnValue(reference as ComponentRef<AlertComponent>);
    const optionUpdate = (dropdown as Element).querySelectorAll('.dropdown-menu > .dropdown-item').item(0);
    optionUpdate.dispatchEvent( new Event('click'));

  });

  it('cambiar de limite a la lista de la tabla', () => {
    component.onChangeLimit({ target: { value: 10 } });
    expect(component.display).toBe(10);
    expect(component.currentPage).toBe(1);
  });

  it('se busca product | debe filtrar', () => {
    component.searchProduct({ target:  { value: 'actualizado'}});
    fixture.detectChanges();
    expect(component.filterProducts.length).toBe(1);
  });

  it('se cambia de paginacion', () => {
    component.onPaginate(2);
    expect(component.filterProducts.length).toBe(0);
  });


});
