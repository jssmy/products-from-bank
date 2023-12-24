import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductUseCase } from '../../../domain/usecase/product-use-cases';
import { Product } from '../../../domain/models/product/product';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from 'src/app/commons/UI/dropdown/dropdown.component';
import { WARNING_DELETE } from '../../commons/constants/warning-delete';
import { ModalService } from 'src/app/commons/services/modal.service';
import { ButtonOption } from 'src/app/commons/interfaces/button-option';
import { AlertComponent } from 'src/app/commons/UI/alert/alert.component';
import { Subscription, filter, pipe, switchMap, tap } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  providers: [],
  imports: [
    CommonModule,
    DropdownComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filterProducts: Product[] = [];
  productSelected: Product;
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
    private productUseCase: ProductUseCase,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productUseCase.getAll()
      .subscribe(product => {
        this.products = product;
        this.filterProducts = [...this.products];
      });
  }


  onSelect(product: Product) {
    this.productSelected = product;
  }

  onSelectOption(key: string) {
    if (key === 'delete') {
      this.deleteAction();
    }
  }

  searchProduct($event) {
    const text = $event.target.value as string;
    this.filterProducts = [...this.products]
      .filter(product => product.name
        .toLocaleLowerCase()
        .includes(text.toLocaleLowerCase()) || product.description
        .includes(text.toLocaleLowerCase()))
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

  ngOnDestroy(): void {
    this.$subscriptions.forEach(sub => sub.unsubscribe());
  }

}
