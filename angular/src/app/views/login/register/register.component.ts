import { Component, OnInit } from '@angular/core';
import { CustomerRequest } from 'src/app/services/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  customerRequest: CustomerRequest;

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
  }

  register(): void {
    let request: CustomerRequest = {
      ...new CustomerRequest()
    };

    this.customerService.registerNewCustomer(request).subscribe();
  }
}
