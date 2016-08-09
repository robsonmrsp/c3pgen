package ${application.corePackage}.service;

import java.util.List;


import ${application.corePackage}.model.Client;
import ${application.corePackage}.model.User;
import ${application.corePackage}.persistence.pagination.Pager;
import ${application.corePackage}.persistence.pagination.PaginationParams;

/**
 * generated: 19/02/2014 19:18:57
 **/
public interface UserService {

	User get(Integer id);

	User get(Integer id, Client client);

	List<User> all();

	List<User> all(Client owner);

	Pager<User> all(PaginationParams paginationParams);

	Pager<User> all(PaginationParams paginationParams, Client owner);

	List<User> search(String searchText);

	User save(User entity);

	User update(User entity);

	Boolean delete(Integer id);

	User getLoggedUser();
}
