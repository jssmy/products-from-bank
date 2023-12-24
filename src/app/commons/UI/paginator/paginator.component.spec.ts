import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        PaginatorComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('se vuelve a calcular el paginador cuando se cambian los datos de entrada', () => {
    component.total = 100;
    component.page = 1;
    component.display = 5;
    component.ngOnChanges(null);
    fixture.detectChanges();
    expect(component.items.length).toBeGreaterThan(0);
  });
});
