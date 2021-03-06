import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import {ApiService} from './shared/services/api.service';
import {AuthorizationService} from './shared/services/authorization.service';
import {EmployeeService} from './shared/services/employee.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ProductService} from './shared/services/product.service';
import {AppErrorHandler} from './common/app-error-handler';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular-4-data-table';
import {CartService} from './shared/services/cart.service';
import { ProductCardComponent } from './products/product-card/product-card.component';
import {AuthGuard} from './shared/services/auth-guard.service';
import {AdminAuthGuard} from './shared/services/admin-auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    AdminProductsComponent,
    LoginComponent,
    ProductFormComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CustomFormsModule,
    DataTableModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'products', component: ProductsComponent},
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'login', component: LoginComponent },
      {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
    ])
  ],
  providers: [
    ApiService,
    AuthorizationService,
    EmployeeService,
    ProductService,
    CartService,
    AuthGuard,
    AdminAuthGuard,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
