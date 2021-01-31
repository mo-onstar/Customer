import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './views/login/register/register.component';
import { CustomerListComponent } from './views/customer/customer-list/customer-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CustomerDetailComponent } from './views/customer/customer-detail/customer-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    CustomerListComponent,
    CustomerDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    RouterModule.forRoot([
      { path: 'register', component: RegisterComponent },
      { path: 'customerList', component: CustomerListComponent },
      { path: 'customerDetails', component: CustomerDetailComponent },
      { path: '', redirectTo: '/register', pathMatch: 'full' },
    ]
    ),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
