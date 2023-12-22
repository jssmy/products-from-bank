import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductGateway } from './product/domain/models/product/gateway/product-gateway';
import { ProductService } from './product/infraestructure/driven-adapter/api/product.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: ProductGateway,
      useClass: ProductService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
