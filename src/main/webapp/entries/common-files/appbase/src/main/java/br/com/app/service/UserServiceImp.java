package ${application.rootPackage}.service;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.transaction.annotation.Transactional;

import ${application.rootPackage}.model.Client;
import ${application.rootPackage}.model.User;
import ${application.rootPackage}.persistence.DaoUser;
import ${application.rootPackage}.persistence.pagination.Pager;
import ${application.rootPackage}.persistence.pagination.Pagination;
import ${application.rootPackage}.persistence.pagination.PaginationParams;
import ${application.rootPackage}.security.SpringSecurityUserContext;

/**
 * generated: 19/02/2014 19:18:57
 **/

@Named
@Transactional
public class UserServiceImp implements UserService {
	@Inject
	DaoUser daoUser;

	@Inject
	private SpringSecurityUserContext context;

	@Override
	public User get(Integer id) {
		return daoUser.find(id);
	}

	@Override
	public User get(Integer id, Client client) {
		return daoUser.find(id, client);
	}

	@Override
	public List<User> all(Client client) {
		return daoUser.getAll(client);
	}

	@Override
	public List<User> all() {
		return daoUser.getAll();
	}

	@Override
	public Pager<User> all(PaginationParams paginationParams, Client owner) {
		Pagination<User> pagination = daoUser.getAll(paginationParams, owner);
		return new Pager<User>(pagination.getResults(), 0, pagination.getTotalRecords());
	}

	@Override
	public Pager<User> all(PaginationParams paginationParams) {
		Pagination<User> pagination = daoUser.getAll(paginationParams);
		return new Pager<User>(pagination.getResults(), 0, pagination.getTotalRecords());
	}

	@Override
	public List<User> search(String text) {
		return daoUser.searchByText("name", text, getLoggedUser().getOwner());
	}

	@Override
	public User save(User entity) {
		return daoUser.save(entity);
	}

	@Override
	public User update(User entity) {
		return daoUser.save(entity);
	}

	@Override
	public Boolean delete(Integer id) {
		return daoUser.delete(id);
	}

	@Override
	public User getLoggedUser() {
		return context.getCurrentUser();
	}
}
