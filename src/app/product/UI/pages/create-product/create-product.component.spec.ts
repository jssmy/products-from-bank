import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateProductComponent } from './create-product.component';
import { ProductGateway } from 'src/app/product/domain/models/product/gateway/product-gateway';
import { ProductService } from 'src/app/product/infraestructure/driven-adapter/api/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DateHelper } from 'src/app/commons/helpers/date-helper';
import { ModalService } from 'src/app/commons/services/modal.service';
import { ProductUseCase } from 'src/app/product/domain/usecase/product-use-cases';
import { of } from 'rxjs';
import { ComponentRef } from '@angular/core';
import { AlertComponent } from 'src/app/commons/UI/alert/alert.component';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let modal: ModalService;
  let productUseCase: ProductUseCase;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateProductComponent,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ProductGateway,
          useClass: ProductService
        },
        ModalService,
        ProductUseCase
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    modal = TestBed.inject(ModalService);
    productUseCase = TestBed.inject(ProductUseCase);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('crear nuevo product', () => {
    component.presenter.logo.setValue('https://w7.pngwing.com/pngs/388/487/png-transparent-computer-icons-graphy-img-landscape-graphy-icon-miscellaneous-angle-text-thumbnail.png')
    component.presenter.name.setValue('tarjeta de credito');
    component.presenter.description.setValue('Descripcion de la tarjeta');
    component.presenter.dateLiberation.setValue(DateHelper.date().format('YYYY-MM-DD'));
    component.presenter.id.setValue('tr-2323');
    component.changeDateLiberaton();

    const product = component.presenter.getProduct();

    fixture.detectChanges();


    const alertInstance = {
      instance: {
        onDismis: of(true),
      },
      destroy: () => { }
    };

    spyOn(modal, 'open').and.returnValue(alertInstance as ComponentRef<AlertComponent>);
    spyOn(productUseCase, 'save').and.returnValue(of(product));
    spyOn(productUseCase, 'update').and.returnValue(of(product));

    const button = fixture.debugElement.nativeElement.querySelector('#btn-send');
    
    expect(component.presenter.form.valid).toBe(true);

    button.click();

    fixture.detectChanges();
    
  
    expect(productUseCase.save).toHaveBeenCalled();


    // cuando actualiza

    productUseCase.setSelectedProduct(product);
    component.ngOnInit();
    fixture.detectChanges();
    button.click();

    expect(productUseCase.update).toHaveBeenCalled();

  });

  it('validar que el formulario muestre error y no deje guardar cuando el id existe', () => {
    spyOn(productUseCase, 'exist').and.returnValue(of(true));
    component.presenter.id.setValue('tr-rrr');
    fixture.detectChanges();
    component.validateIdUnique();
    const errors = component.presenter.id.errors;
    expect(Object.keys(errors)).toContain('unique');
  });


});
