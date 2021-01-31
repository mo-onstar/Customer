import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/services/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  @Input() customer: Customer;

  customerDetail: Customer;

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.customerDetail = this.customer;
  }

  update(): void {
    this.customerService.updateCustomer(this.customerDetail, this.customerDetail.customerId).subscribe();
  }

  delete(): void {
    this.customerService.deleteCustomer(this.customerDetail.customerId).subscribe();
  }

}
