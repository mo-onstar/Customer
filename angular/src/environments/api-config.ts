import { environment } from './environment';

export const ApiConfig = {
  REGISTER_CUSTOMER: environment.apiUrl + 'customer/add',
  ALL_CUSTOMER: environment.apiUrl + 'customer',
  CUSTOMER_DETAILS: environment.apiUrl + 'customer/${id}'
};
