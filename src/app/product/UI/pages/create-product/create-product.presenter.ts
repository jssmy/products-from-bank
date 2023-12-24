import { Injectable } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { CONTROL_ERRORS } from "../../commons/constants/control-errors";
import { Product } from "src/app/product/domain/models/product/product";
import { DateHelper } from "src/app/commons/helpers/date-helper";

@Injectable({
    providedIn: 'root'
})
export class CreateProductPresenter {
    form: FormGroup;
    id = new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]);
    name = new FormControl(null, [Validators.required ,Validators.minLength(5), Validators.maxLength(100)]);
    description = new FormControl(null, [Validators.required,Validators.minLength(10), Validators.maxLength(200)]);
    logo = new FormControl(null, [Validators.required]);
    dateLiberation = new FormControl(null, [Validators.required, this.dateLiberationValidation()]);
    dateRevision = new FormControl(null, [Validators.required]);
    controlError = CONTROL_ERRORS;
    
    constructor() {
        this.form = new FormGroup(
            {
                id: this.id,
                name: this.name,
                description: this.description,
                logo: this.logo,
                dateLiberation: this.dateLiberation,
                dateRevision: this.dateRevision
            }
        );
    }


    getProduct(): Product {
        return {
            id: this.id.value,
            name: this.name.value,
            date_release: this.dateLiberation.value,
            date_revision: this.dateRevision.value,
            description: this.description.value,
            logo: this.logo.value
        }
    }


    dateLiberationValidation(): ValidatorFn {
        return (control: AbstractControl) => {
          const inputDate =  DateHelper.stringToMomentDate(control.value);
          const today = DateHelper.date();
          if (inputDate.diff(today, 'days') >= 0) {
            return null; // La validación pasa, no hay error
          } else {
            return { 'invalidate': true }; // La validación falla, devuelve un error
          }
        };
      }
}