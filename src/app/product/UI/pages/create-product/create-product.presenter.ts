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
    id: FormControl;
    name: FormControl;
    description: FormControl;
    logo: FormControl;
    dateLiberation: FormControl
    dateRevision: FormControl;
    controlError = CONTROL_ERRORS;

    constructor() {
        this.init();
    }

    init(product: Product = null) {

        this.id = new FormControl(
            product?.id,
            [Validators.required, Validators.minLength(3), Validators.maxLength(10)]);

        this.name = new FormControl(
            product?.name,
            [Validators.required, Validators.minLength(5), Validators.maxLength(100)]);

        this.description = new FormControl(
            product?.description,
            [Validators.required, Validators.minLength(10), Validators.maxLength(200)]);

        this.logo = new FormControl(product?.logo, [Validators.required]);

        this.dateLiberation = new FormControl(
            DateHelper.stringToMomentDate(product?.date_release)?.format('YYYY-MM-DD'),
            [Validators.required, this.dateLiberationValidation()]);
        this.dateRevision = new FormControl(
            DateHelper.stringToMomentDate(product?.date_revision)?.format('YYYY-MM-DD'),
            [Validators.required]);

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
            const inputDate = DateHelper.stringToMomentDate(control.value);
            const today = DateHelper.date();
            if (inputDate?.diff(today, 'days') >= 0) {
                return null; // La validación pasa, no hay error
            } else {
                return { 'invalidate': true }; // La validación falla, devuelve un error
            }
        };
    }
}