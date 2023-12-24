  import { Component, OnDestroy, OnInit } from '@angular/core';
  import { ProductUseCase } from '../../../domain/usecase/product-use-cases';
import { Product } from '../../../domain/models/product/product';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from 'src/app/commons/UI/dropdown/dropdown.component';
import { WARNING_DELETE } from '../../commons/constants/warning-delete';
import { ModalService } from 'src/app/commons/services/modal.service';
import { ButtonOption } from 'src/app/commons/interfaces/button-option';
import { AlertComponent } from 'src/app/commons/UI/alert/alert.component';
import { Subscription, filter, switchMap, tap } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from 'src/app/commons/UI/paginator/paginator.component';

@Component({
  selector: 'app-products',
  standalone: true,
  providers: [],
  imports: [
    CommonModule,
    DropdownComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorComponent
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filterProducts: Product[] = [];
  productSelected: Product;
  display = 5;
  currentPage = 1;
  total = 0;
  formSearch = new FormGroup({ search: new FormControl() });
  dropItems: ButtonOption[] = [
    {
      key: 'update',
      label: 'Modificar'
    },
    {
      key: 'delete',
      label: 'Eliminar'
    },
  ];

  $subscriptions: Subscription[] = [];
  constructor(
    private readonly productUseCase: ProductUseCase,
    private readonly modalService: ModalService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productUseCase.getAll()
      .subscribe(product => {
        this.products = product;
        this.filterProducts = this.paginateProducts(
          [...this.products]
        );
        this.total = this.products.length;
      });
  }

  paginateProducts(products: Product[]) {
    return  products.slice((this.currentPage - 1 ) * this.display,  this.currentPage * this.display );
  }

  onSelect(product: Product) {
    this.productSelected = product;
  }

  onSelectOption(key: string) {
    if (key === 'delete') {
      this.deleteAction();
    } else if (key === 'update') {
      this.updateAction();
    }
  }

  searchProduct($event) {
    const text = $event.target.value as string;
    this.filterProducts = [...this.products]
      .filter(product => product.name
        .toLocaleLowerCase()
        .includes(text.toLocaleLowerCase()) || product.description
        .includes(text.toLocaleLowerCase()));

    this.currentPage = 1;
    this.total = this.filterProducts.length;
    this.filterProducts = this.paginateProducts(
      [...this.filterProducts]
    );

  }

  private deleteAction() {
    const message = { ...WARNING_DELETE };
    message.title = message.title.replace(':productName', this.productSelected.name);
    const reference = this.modalService.open(AlertComponent, { config: message })
    const sub = reference.instance.onDismis
      .pipe(
        tap(() => reference.destroy()),
        filter(confirm => confirm),
        switchMap(() => this.productUseCase.delete(this.productSelected.id))
      )
      .subscribe(() => this.loadProducts())

    this.$subscriptions.push(sub);
  }

  private updateAction() {
    this.productUseCase.setSelectedProduct(this.productSelected);
    this.router.navigate(['/create']);
  }


  onChangeLimit($event) {
    this.display = Number($event.target.value);
    this.currentPage = 1;
    this.filterProducts = this.paginateProducts(this.products);
  }

  onPaginate(page: number) {
    this.currentPage = Number(page);
    console.log(this.currentPage, this.products);
    this.filterProducts = this.paginateProducts(
      [...this.products]
    );
  }

  trackByFn(index, product: Product) {
    return product.id;
  }

  ngOnDestroy(): void {
    this.$subscriptions.forEach(sub => sub.unsubscribe());
  }

}
