import { Customers } from "./customers";

export class Customer {
    customerId: string;
    name: string;
    address: string;
    city: string;
    state: string;
    phoneno: string;
    email: string;
}

export class CustomerRequest extends Customer{
}