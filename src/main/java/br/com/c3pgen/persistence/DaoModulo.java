package br.com.c3pgen.persistence;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.c3pgen.model.Client;
import br.com.c3pgen.model.Modulo;
import br.com.c3pgen.model.filter.FilterModulo;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.persistence.pagination.Paginator;

/**
 * generated: 05/08/2016 15:23:44
 **/

@Named
@SuppressWarnings("rawtypes")
public class DaoModulo extends AccessibleHibernateDao<Modulo> {
	private static final Logger LOGGER = Logger.getLogger(DaoModulo.class);

	public DaoModulo() {
		super(Modulo.class);
	}

	@Override
	public Pagination<Modulo> getAll(PaginationParams paginationParams) {
		FilterModulo filterModulo = (FilterModulo) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterModulo.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterModulo.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterModulo.getNome(), MatchMode.ANYWHERE));
		}

		return new Paginator<Modulo>(searchCriteria, countCriteria).paginate(paginationParams);
	}

	public List<Modulo> filter(PaginationParams paginationParams) {
		List<Modulo> list = new ArrayList<Modulo>();
		FilterModulo filterModulo = (FilterModulo) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterModulo.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterModulo.getNome()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}

	@Override
	public Pagination<Modulo> getAll(PaginationParams paginationParams, Client owner) {
		FilterModulo filterModulo = (FilterModulo) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		countCriteria.add(Restrictions.eq("owner", owner));

		if (filterModulo.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterModulo.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterModulo.getNome(), MatchMode.ANYWHERE));
		}
		return new Paginator<Modulo>(searchCriteria, countCriteria).paginate(paginationParams);
	}

	public List<Modulo> filter(PaginationParams paginationParams, Client owner) {
		List<Modulo> list = new ArrayList<Modulo>();
		FilterModulo filterModulo = (FilterModulo) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		if (filterModulo.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterModulo.getNome()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}

}
