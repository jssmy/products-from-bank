import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from 'src/app/commons/UI/input/input.component';
import { CreateProductPresenter } from './create-product.presenter';
import { PipesModule } from 'src/app/commons/pipes/pipes.module';
import { ProductUseCase } from 'src/app/product/domain/usecase/product-use-cases';
import { DateHelper } from 'src/app/commons/helpers/date-helper';
import { Subscription, filter, tap } from 'rxjs';
import { ModalService } from 'src/app/commons/services/modal.service';
import { AlertComponent } from 'src/app/commons/UI/alert/alert.component';
import { WARNING_SAVE } from '../../commons/constants/warning-save';
import { ERROR_SAVE } from '../../commons/constants/error-save';
import { SUCCESS_SAVE } from '../../commons/constants/success-save';
import { Alert } from 'src/app/commons/interfaces/alert';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  providers: [
    CreateProductPresenter
  ],
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit, OnDestroy {
  private subscription$ = new Subscription();
  constructor(
    public readonly presenter: CreateProductPresenter,
    private readonly productUseCase: ProductUseCase,
    private readonly modal: ModalService
  ) { }

  ngOnInit(): void {


  }

  onSubmint() {
    const reference = this.modal.open(AlertComponent, { config: WARNING_SAVE });

    reference.instance.onDismis
      .pipe(
        tap(() => reference.destroy()),
        filter(confirm => confirm)
      ).subscribe(() => {
        this.productUseCase.save(
          this.presenter.getProduct()
        )
          .subscribe({
            next: () => {
              this.presenter.form.reset();
              this.simpleModal(SUCCESS_SAVE);
            },
            error: () => this.simpleModal(ERROR_SAVE)
          });
      });

  }

  private simpleModal(alert: Alert) {
    const reference = this.modal.open(AlertComponent, { config: alert});
              reference.instance.onDismis
              .subscribe(() => reference.destroy());
  }
  

  validateIdUnique() {
    this.presenter.form.disable();
    this.productUseCase
      .exist(this.presenter.id.value)
      .pipe(
        tap(() => this.presenter.form.enable()),
        filter(confirm => confirm)
      )
      .subscribe(() => this.presenter.id.setErrors({ unique: true }));
  }


  changeDateLiberaton() {
    const dateLiberation = DateHelper.stringToMomentDate(this.presenter.dateLiberation.value);
    const dateRevision = dateLiberation.add(1, 'year').format('YYYY-MM-DD');
    this.presenter.dateRevision.setValue(dateRevision);
  }

  clear() {
    this.presenter.form.reset();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
