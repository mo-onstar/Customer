package net.codejava.repository;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import net.codejava.models.Customer;

public class CustomerRepository {

	private static String url = "jdbc:sqlserver://database-1.cjrehmcadpvo.ap-southeast-1.rds.amazonaws.com:1433;databaseName=AffinHwang";
	private static String user = "admin";
	private static String password = "password";

	public List<Customer> getCustomerList() {
		List<Customer> customerlist = new ArrayList<Customer>();
		try {
			Connection connection = DriverManager.getConnection(url, user, password);

			String sql = "SELECT * FROM customer";

			Statement statement = connection.createStatement();
			ResultSet result = statement.executeQuery(sql);

			while (result.next()) {
				Customer c = new Customer();
				c.setName(result.getString("name"));
				c.setAddress(result.getString("address"));
				c.setCity(result.getString("city"));
				c.setState(result.getString("state"));
				c.setPhoneno(result.getString("phoneno"));
				c.setEmail(result.getString("email"));
				customerlist.add(c);
			}

			connection.close();

		} catch (SQLException e) {
			e.printStackTrace();
		}
		return customerlist;
	}

	public String countCustomer() {
		int count = 0;
		try {
			Connection connection = DriverManager.getConnection(url, user, password);

			String sql = "SELECT Count(customerID) FROM customer";

			Statement statement = connection.createStatement();
			ResultSet result = statement.executeQuery(sql);

			while (result.next()) {
				count = result.getInt("customerID");
			}

			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return String.valueOf(count);
	}

	public void addNewCustomer(Customer customer) {
		try {
			Connection connection = DriverManager.getConnection(url, user, password);

			String sql = "INSERT INTO customer (customerID, name, address, city, state, phoneno, email)"
					+ " VALUES (?,?,?,?,?,?,?)";

			PreparedStatement statement = connection.prepareStatement(sql);
			statement.setString(1, customer.getCustomerID());
			statement.setString(2, customer.getName());
			statement.setString(3, customer.getAddress());
			statement.setString(4, customer.getCity());
			statement.setString(5, customer.getState());
			statement.setString(6, customer.getPhoneno());
			statement.setString(7, customer.getEmail());
			statement.executeUpdate();

			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public void updateCustomer(Customer customer, String id) {
		try {
			Connection connection = DriverManager.getConnection(url, user, password);

			String sql = "UPDATE customer SET name = ?, address = ?, city = ?, state = ?, phoneno = ?, email = ? WHERE customerID = ?";

			PreparedStatement statement = connection.prepareStatement(sql);
			statement.setString(1, customer.getName());
			statement.setString(2, customer.getAddress());
			statement.setString(3, customer.getCity());
			statement.setString(4, customer.getState());
			statement.setString(5, customer.getPhoneno());
			statement.setString(6, customer.getEmail());
			statement.setString(7, id);
			statement.executeUpdate();

			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public void deleteCustomer(String id) {
		try {
			Connection connection = DriverManager.getConnection(url, user, password);

			String sql = "DELETE FROM customer WHERE customerID = ?";

			PreparedStatement statement = connection.prepareStatement(sql);
			statement.setString(1, id);
			statement.execute();

			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
