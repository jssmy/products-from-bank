import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'controlError'
})
export class ControlErrorPipe implements PipeTransform {

  transform(errors: object,controlError: object , showError: boolean,): string {

    if (!showError || !errors) {
        // no se debe mostrar error
        return '';
    }

    const errorKeys = Object.keys(errors);

    const [errorKey] = errorKeys;

    return controlError[errorKey] as string;


  }

}
