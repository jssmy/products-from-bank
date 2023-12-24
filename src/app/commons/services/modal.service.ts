import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, Type } from '@angular/core';
import { AlertComponent } from '../UI/alert/alert.component';
import { WARNING_DELETE } from 'src/app/product/UI/commons/constants/warning-delete';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }


  open<T>(template: Type<T>, config: object) {
    const factory = this.resolver.resolveComponentFactory(template);
    const componentRef = factory.create(this.injector);
    const keys = Object.keys(config);

    for(const key of keys) {
      componentRef.instance[key] = config[key];
    }

    // Insertar el componente en el body
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    return componentRef;
  }
}


