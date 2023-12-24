import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';
import { PRODUCT_DROPDOWN } from 'src/app/product/UI/commons/constants/product-dropdown';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        DropdownComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('se validar que se emita el elemento que selecciona el usuario', () => {
    
    component.items = PRODUCT_DROPDOWN;
    const [selected] = component.items;

    component.onChange.subscribe(key => {
      expect(key).toBe(selected.key);
    });

    component.change(selected.key);
  });
});
