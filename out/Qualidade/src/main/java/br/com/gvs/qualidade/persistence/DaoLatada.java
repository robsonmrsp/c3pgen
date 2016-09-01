package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.Latada;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterLatada;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.Latada;
import br.com.gvs.qualidade.model.Client;
/**
*  generated: 01/09/2016 17:25:05
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoLatada extends AccessibleHibernateDao<Latada> {
	private static final Logger LOGGER = Logger.getLogger(DaoLatada.class);

	public DaoLatada() {
		super(Latada.class);
	}

	@Override
	public Pagination<Latada> getAll(PaginationParams paginationParams) {
		FilterLatada filterLatada = (FilterLatada) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterLatada.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterLatada.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterLatada.getNome(), MatchMode.ANYWHERE));
		}
		if (filterLatada.getClient() != null) {
			searchCriteria.createAlias("client", "client_");
			countCriteria.createAlias("client", "client_");
			searchCriteria.add(Restrictions.eq("client_.id", filterLatada.getClient()));
			countCriteria.add(Restrictions.eq("client_.id", filterLatada.getClient()));
		}

		return new Paginator<Latada>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Latada> filter(PaginationParams paginationParams) {
		List<Latada> list = new ArrayList<Latada>();
		FilterLatada filterLatada = (FilterLatada) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterLatada.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterLatada.getNome()));
		}
		if (filterLatada.getClient() != null) {
			searchCriteria.createAlias("client", "client_");
			searchCriteria.add(Restrictions.eq("client_.id", filterLatada.getClient()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
	@Override
	public Pagination<Latada> getAll(PaginationParams paginationParams, Client owner) {
		FilterLatada filterLatada = (FilterLatada) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		countCriteria.add(Restrictions.eq("owner", owner));
		
		if (filterLatada.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterLatada.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterLatada.getNome(), MatchMode.ANYWHERE));
		}
		if (filterLatada.getClient() != null) {
			searchCriteria.createAlias("client", "client_");
			countCriteria.createAlias("client", "client_");
			searchCriteria.add(Restrictions.eq("client_.id", filterLatada.getClient()));
			countCriteria.add(Restrictions.eq("client_.id", filterLatada.getClient()));
		}
	return new Paginator<Latada>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	

	public List<Latada> filter(PaginationParams paginationParams, Client owner) {
		List<Latada> list = new ArrayList<Latada>();
		FilterLatada filterLatada = (FilterLatada) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		if (filterLatada.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterLatada.getNome()));
		}
		if (filterLatada.getClient() != null) {
			searchCriteria.createAlias("client", "client_");
			searchCriteria.add(Restrictions.eq("client_.id", filterLatada.getClient()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
	
}
