package net.codejava.services;

import java.util.List;
import java.util.function.Predicate;

import net.codejava.models.Customer;
import net.codejava.repository.CustomerRepository;

public class CustomerService {

	private CustomerRepository customerRepo;

	public List<Customer> getAllCustomer() {
		return customerRepo.getCustomerList();
	}

	public Customer getCustomerById(String id) {
		Predicate<Customer> byId = p -> p.getCustomerID().equals(id);
		return filterCustomers(byId);
	}

	private Customer filterCustomers(Predicate<Customer> strategy) {
		return getAllCustomer().stream().filter(strategy).findFirst().orElse(null);
	}

	public void addCustomer(Customer customer) {
		customer.setCustomerID(customerRepo.countCustomer());
		customerRepo.addNewCustomer(customer);
	}

	public void updateCustomer(Customer customer, String id) {
		customerRepo.updateCustomer(customer, id);
	}
	
	public void deleteCustomer(String id) {
		customerRepo.deleteCustomer(id);
	}

}
