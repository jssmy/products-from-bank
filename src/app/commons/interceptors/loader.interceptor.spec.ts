import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderInterceptor } from './loader.interceptor';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { LoaderComponent } from '../UI/loader/loader.component';
import { ModalService } from '../services/modal.service';

describe('LoaderInterceptor', () => {

  let interceptor: LoaderInterceptor;
  let httpClient: HttpClient;
  let modal: ModalService;
  let loader: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ModalService,
      LoaderInterceptor,
      { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },

    ],
    imports: [
      HttpClientTestingModule,
      LoaderComponent
    ],
    declarations: []
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    loader = fixture.componentInstance;
    interceptor = TestBed.inject(LoaderInterceptor);
    modal = TestBed.inject(ModalService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    
    expect(interceptor).toBeTruthy();
  });


  it('validar que se abra el loader', () => {

    spyOn(modal, 'open').and.returnValue(fixture.componentRef);

    httpClient.get('https://api.example.com/data').subscribe();

    expect(modal.open).toHaveBeenCalled();
  });

});
