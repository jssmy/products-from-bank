import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';
import { WARNING_DELETE } from 'src/app/product/UI/commons/constants/warning-delete';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AlertComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.config = WARNING_DELETE;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validar que se emita el evento', () => {
    component.onDismis.subscribe(confirm => {
      expect(confirm).toBeTrue();
    })
    component.onClick(true);
  });
});
