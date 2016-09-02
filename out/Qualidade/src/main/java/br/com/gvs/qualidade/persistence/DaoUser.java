package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.User;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterUser;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.User;
/**
*  generated: 02/09/2016 16:23:49
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoUser extends AccessibleHibernateDao<User> {
	private static final Logger LOGGER = Logger.getLogger(DaoUser.class);

	public DaoUser() {
		super(User.class);
	}
	public User findByUsername(String username) {
		User user = null;
		try {
			user = (User) criteria().add(Restrictions.eq("username", username)).uniqueResult();
		} catch (Exception e) {
			LOGGER.error("Erro ao obter Usuário pelo username," + username, e);
		}
		return user;
	}

	@Override
	public Pagination<User> getAll(PaginationParams paginationParams) {
		FilterUser filterUser = (FilterUser) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterUser.getName() != null) {
			searchCriteria.add(Restrictions.ilike("name", filterUser.getName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("name", filterUser.getName(), MatchMode.ANYWHERE));
		}
		if (filterUser.getUsername() != null) {
			searchCriteria.add(Restrictions.ilike("username", filterUser.getUsername(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("username", filterUser.getUsername(), MatchMode.ANYWHERE));
		}
		if (filterUser.getPassword() != null) {
			searchCriteria.add(Restrictions.ilike("password", filterUser.getPassword(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("password", filterUser.getPassword(), MatchMode.ANYWHERE));
		}
		if (filterUser.getEnable() != null) {
			searchCriteria.add(Restrictions.eq("enable", filterUser.getEnable()));
			countCriteria.add(Restrictions.eq("enable", filterUser.getEnable()));
		}				
		if (filterUser.getImage() != null) {
			searchCriteria.add(Restrictions.ilike("image", filterUser.getImage(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("image", filterUser.getImage(), MatchMode.ANYWHERE));
		}
		if (filterUser.getOwner() != null) {
			searchCriteria.createAlias("owner", "owner_");
			countCriteria.createAlias("owner", "owner_");
			searchCriteria.add(Restrictions.eq("owner_.id", filterUser.getOwner()));
			countCriteria.add(Restrictions.eq("owner_.id", filterUser.getOwner()));
		}

		return new Paginator<User>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<User> filter(PaginationParams paginationParams) {
		List<User> list = new ArrayList<User>();
		FilterUser filterUser = (FilterUser) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterUser.getName() != null) {
			searchCriteria.add(Restrictions.eq("name", filterUser.getName()));
		}
		if (filterUser.getUsername() != null) {
			searchCriteria.add(Restrictions.eq("username", filterUser.getUsername()));
		}
		if (filterUser.getPassword() != null) {
			searchCriteria.add(Restrictions.eq("password", filterUser.getPassword()));
		}
		if (filterUser.getEnable() != null) {
			searchCriteria.add(Restrictions.eq("enable", filterUser.getEnable()));
		}
		if (filterUser.getImage() != null) {
			searchCriteria.add(Restrictions.eq("image", filterUser.getImage()));
		}
		if (filterUser.getOwner() != null) {
			searchCriteria.createAlias("owner", "owner_");
			searchCriteria.add(Restrictions.eq("owner_.id", filterUser.getOwner()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
