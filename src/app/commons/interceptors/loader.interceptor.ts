import { ComponentRef, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { ModalService } from '../services/modal.service';
import { LoaderComponent } from '../UI/loader/loader.component';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private countRequest = 0;
  private referece: ComponentRef<LoaderComponent>;
  constructor(
    private readonly modal: ModalService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.countRequest++;

    if (this.countRequest <= 1) {
      this.referece = this.modal.open(LoaderComponent);
    }

    return next.handle(request)
    .pipe(
      finalize(() => {
        this.countRequest--;
        if (this.countRequest == 0) {
          this.referece.destroy();
        }
      })
    );
  }
}
