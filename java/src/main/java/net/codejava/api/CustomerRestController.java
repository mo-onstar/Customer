package net.codejava.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import net.codejava.models.Customer;
import net.codejava.services.CustomerService;

@RestController
public class CustomerRestController {

	@Autowired
	private CustomerService customerservice;

	@RequestMapping(method = RequestMethod.GET, value = "/customer")
	public List<Customer> getAllCustomer() {
		return customerservice.getAllCustomer();
	}

	@RequestMapping(method = RequestMethod.GET, value = "/customer/{id}")
	public ResponseEntity<Customer> getCustomerById(@PathVariable String customerId) {
		Customer customer = customerservice.getCustomerById(customerId);
		if (customer == null) {
			return new ResponseEntity<Customer>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Customer>(customer, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST, value = "/customer/add")
	public void addCustomer(@RequestBody Customer customer) {
		customerservice.addCustomer(customer);
	}

	@RequestMapping(method = RequestMethod.PUT, value = "/customer/{id}")
	public void updateCustomer(@RequestBody Customer customer, @PathVariable String customerId) {
		customerservice.updateCustomer(customer, customerId);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/customer/{id}")
	public void deleteCustomer(@PathVariable String customerId) {
		customerservice.deleteCustomer(customerId);
	}

}
