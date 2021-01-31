import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Customer } from 'src/app/services/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})

export class CustomerListComponent implements OnInit {

  displayedColumns: string[];
  dataSource: Customer[];
  Customer: Customer;

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['name', 'email'];

    this.customerService.getAllCustomer().subscribe({
      next: response => this.dataSource = response.customer
    });
  }

  viewCustomer(customerId: string): void {
    this.customerService.getCustomerDetail(customerId).subscribe({
      next: response => this.Customer = response
    });
  }

}
