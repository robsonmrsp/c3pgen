/* generated by JSetup ${JSetupVersion} :  at ${.now} */
package ${application.rootPackage}.persistence;


import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.log4j.Logger;

import br.com.netflics.core.model.Owner;
import br.com.netflics.core.persistence.HibernateDao;
import br.com.netflics.core.persistence.pagination.Pager;
import br.com.netflics.core.persistence.pagination.PaginationParams;

import ${application.rootPackage}.model.User;
import ${application.rootPackage}.model.filter.FilterUser;

@Named
@SuppressWarnings("rawtypes")
public class DaoUser extends HibernateDao<User> {
	private static final Logger LOGGER = Logger.getLogger(DaoUser.class);

	public DaoUser() {
		super(User.class);
	}

	public User findByName(String name, Owner owner) {

		User user = null;
		try {
			
			CriteriaBuilder builder = builder();
			Root<User> root = root();
			CriteriaQuery<User> query = query();

			Predicate and = builder.and(builder.equal(root.get("name"), name), builder.equal(root.get("owner").get("id"), owner.getId()));

			user = getSession().createQuery(query.select(root).where(and)).uniqueResult();
		} catch (Exception e) {
			LOGGER.error("Erro ao obter Usuário pelo name," + name, e);
		}
		return user;
	}

	public User findByUsername(String username) {

		User user = null;
		try {
			CriteriaBuilder builder = builder();
			Root<User> root = root();
			CriteriaQuery<User> query = query();

			Predicate and = builder.and(builder.equal(root.get("username"), username));

			user = getSession().createQuery(query.select(root).where(and)).uniqueResult();
		} catch (Exception e) {
			LOGGER.error("Erro ao obter Usuário pelo username," + username, e);
		}
		return user;
	}

	public User findByEmail(String email, Owner owner) {

		User user = null;
		try {
			CriteriaBuilder builder = builder();
			Root<User> root = root();
			CriteriaQuery<User> query = query();

			Predicate and = builder.and(builder.equal(root.get("email"), email), builder.equal(root.get("owner").get("id"), owner.getId()));

			user = getSession().createQuery(query.select(root).where(and)).uniqueResult();
		} catch (Exception e) {
			LOGGER.error("Erro ao obter Usuário pelo email," + email, e);
		}
		return user;
	}

	// Consultas considerando o multitenancy
	public Pager<User> getAll(PaginationParams<FilterUser> queryParams, Owner owner) {
		FilterUser filterUser = queryParams.getFilter();
		CriteriaBuilder builder = builder();
		Root<User> root = root();
		CriteriaQuery<User> query = query();

		
		Predicate whereClause = builder.and();

		whereClause = builder.and(whereClause, builder.equal(root.get("owner").get("id"), owner.getId()));

		if (filterUser.getName() != null) {
			whereClause = builder.and(whereClause, builder.like(builder.upper(root.<String>get("name")), "%" + filterUser.getName().toUpperCase() + "%"));
		}
		if (filterUser.getUsername() != null) {
			whereClause = builder.and(whereClause, builder.like(builder.upper(root.<String>get("username")), "%" + filterUser.getUsername().toUpperCase() + "%"));
		}
		if (filterUser.getEmail() != null) {
			whereClause = builder.and(whereClause, builder.like(builder.upper(root.<String>get("email")), "%" + filterUser.getEmail().toUpperCase() + "%"));
		}
		if (filterUser.getPassword() != null) {
			whereClause = builder.and(whereClause, builder.like(builder.upper(root.<String>get("password")), "%" + filterUser.getPassword().toUpperCase() + "%"));
		}
		if (filterUser.getEnable() != null) {
			whereClause = builder.and(whereClause, builder.equal(root.get("enable"), filterUser.getEnable()));
		}
		if (filterUser.getImage() != null) {
			whereClause = builder.and(whereClause, builder.like(builder.upper(root.<String>get("image")), "%" + filterUser.getImage().toUpperCase() + "%"));
		}
		Order orderBy = getOrderBy(queryParams);

		TypedQuery<User> typedQuery = getSession().createQuery(query.select(root).where(whereClause).orderBy(orderBy));
		TypedQuery<Long> typedCountQuery = getSession().createQuery(queryCount.select(builder.count(rootCount)).where(whereClause));

		List<User> results = typedQuery.setFirstResult(queryParams.getFirstResults()).setMaxResults(queryParams.getPageSize()).getResultList();
		Long total = typedCountQuery.getSingleResult();

		return new Pager<User>(results, queryParams.getPage(), total);
	}

	public List<User> filter(PaginationParams<FilterUser> queryParams, Owner owner) {
		FilterUser filterUser = queryParams.getFilter();
		Predicate whereClause = builder.and();

		whereClause = builder.and(whereClause, builder.equal(root.get("owner").get("id"), owner.getId()));

		if (filterUser.getName() != null) {
			whereClause = builder.and(whereClause, builder.like(builder.upper(root.<String>get("name")), "%" + filterUser.getName().toUpperCase() + "%"));
		}
		if (filterUser.getUsername() != null) {
			whereClause = builder.and(whereClause, builder.like(builder.upper(root.<String>get("username")), "%" + filterUser.getUsername().toUpperCase() + "%"));
		}
		if (filterUser.getEmail() != null) {
			whereClause = builder.and(whereClause, builder.like(builder.upper(root.<String>get("email")), "%" + filterUser.getEmail().toUpperCase() + "%"));
		}
		if (filterUser.getPassword() != null) {
			whereClause = builder.and(whereClause, builder.like(builder.upper(root.<String>get("password")), "%" + filterUser.getPassword().toUpperCase() + "%"));
		}
		if (filterUser.getEnable() != null) {
			whereClause = builder.and(whereClause, builder.equal(root.get("enable"), filterUser.getEnable()));
		}
		if (filterUser.getImage() != null) {
			whereClause = builder.and(whereClause, builder.like(builder.upper(root.<String>get("image")), "%" + filterUser.getImage().toUpperCase() + "%"));
		}
		Order orderBy = getOrderBy(queryParams);

		TypedQuery<User> typedQuery = getSession().createQuery(query.select(root).where(whereClause).orderBy(orderBy));

		List<User> results = typedQuery.setFirstResult(queryParams.getFirstResults()).setMaxResults(queryParams.getPageSize()).getResultList();

		return results;
	}

	public List<User> filter(PaginationParams paginationParams, Owner owner, Boolean equals) {
		List<User> list = new ArrayList<User>();
		FilterUser filterUser = (FilterUser) paginationParams.getFilter();

		return filter(filterUser, owner, equals);
	}

	public List<User> filter(FilterUser filterUser, Owner owner, Boolean equals) {
		if (equals) {
			return filterEqual(filterUser, owner);
		} else {
			return filterAlike(filterUser, owner);
		}
	}

	public List<User> filterEqual(FilterUser filterUser, Owner owner) {
		Predicate whereClause = builder.and();

		whereClause = builder.and(whereClause, builder.equal(root.get("owner").get("id"), owner.getId()));

		if (filterUser.getName() != null) {
			whereClause = builder.and(whereClause, builder.equal(root.get("name"), filterUser.getName()));
		}
		if (filterUser.getUsername() != null) {
			whereClause = builder.and(whereClause, builder.equal(root.get("username"), filterUser.getUsername()));
		}
		if (filterUser.getEmail() != null) {
			whereClause = builder.and(whereClause, builder.equal(root.get("email"), filterUser.getEmail()));
		}
		if (filterUser.getPassword() != null) {
			whereClause = builder.and(whereClause, builder.equal(root.get("password"), filterUser.getPassword()));
		}
		if (filterUser.getEnable() != null) {
			whereClause = builder.and(whereClause, builder.equal(root.get("enable"), filterUser.getEnable()));
		}
		if (filterUser.getImage() != null) {
			whereClause = builder.and(whereClause, builder.equal(root.get("image"), filterUser.getImage()));
		}
		TypedQuery<User> typedQuery = getSession().createQuery(query.select(root).where(whereClause));

		List<User> results = typedQuery.getResultList();

		return results;
	}

	public List<User> filterAlike(FilterUser filterUser, Owner owner) {
		Predicate whereClause = builder.and();

		whereClause = builder.and(whereClause, builder.equal(root.get("owner").get("id"), owner.getId()));

		if (filterUser.getName() != null) {
			whereClause = builder.and(whereClause, builder.like(builder.upper(root.<String>get("name")), "%" + filterUser.getName().toUpperCase() + "%"));
		}
		if (filterUser.getUsername() != null) {
			whereClause = builder.and(whereClause, builder.like(builder.upper(root.<String>get("username")), "%" + filterUser.getUsername().toUpperCase() + "%"));
		}
		if (filterUser.getEmail() != null) {
			whereClause = builder.and(whereClause, builder.like(builder.upper(root.<String>get("email")), "%" + filterUser.getEmail().toUpperCase() + "%"));
		}
		if (filterUser.getPassword() != null) {
			whereClause = builder.and(whereClause, builder.like(builder.upper(root.<String>get("password")), "%" + filterUser.getPassword().toUpperCase() + "%"));
		}
		if (filterUser.getEnable() != null) {
			whereClause = builder.and(whereClause, builder.equal(root.get("enable"), filterUser.getEnable()));
		}
		if (filterUser.getImage() != null) {
			whereClause = builder.and(whereClause, builder.like(builder.upper(root.<String>get("image")), "%" + filterUser.getImage().toUpperCase() + "%"));
		}

		TypedQuery<User> typedQuery = getSession().createQuery(query.select(root).where(whereClause));

		List<User> results = typedQuery.getResultList();

		return results;
	}

}
