import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfig } from 'src/environments/api-config';
import { BaseService } from '../base.service';
import { CustomerRequest, Customer } from '../customer';
import { Customers } from '../customers';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private baseService: BaseService
  ) { }

  registerNewCustomer(request: CustomerRequest): Observable<Customer> {
    return this.baseService.post(ApiConfig.REGISTER_CUSTOMER, request);
  }

  getAllCustomer(): Observable<Customers> {
    return this.baseService.get(ApiConfig.ALL_CUSTOMER);
  }

  getCustomerDetail(customerId: string): Observable<Customer> {
    return this.baseService.get(ApiConfig.CUSTOMER_DETAILS.replace('${id}', customerId));
  }

  updateCustomer(request: Customer, customerId: string): Observable<Customer> {
    return this.baseService.put(ApiConfig.CUSTOMER_DETAILS.replace('${id}', customerId), request);
  }

  deleteCustomer(customerId: string): Observable<Customer> {
    return this.baseService.delete(ApiConfig.CUSTOMER_DETAILS.replace('${id}', customerId));
  }
}
