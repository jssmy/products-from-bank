import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './commons/UI/layout/layout.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'products'
  },
  {
    path: 'products',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./product/UI/pages/products/products.component').then(component => component.ProductsComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./product/UI/pages/create-product/create-product.component').then(component => component.CreateProductComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
