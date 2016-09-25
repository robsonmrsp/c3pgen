package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.Packing;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterPacking;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.Packing;
import br.com.gvs.qualidade.model.Client;
/**
*  generated: 24/09/2016 12:52:15
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoPacking extends AccessibleHibernateDao<Packing> {
	private static final Logger LOGGER = Logger.getLogger(DaoPacking.class);

	public DaoPacking() {
		super(Packing.class);
	}

	@Override
	public Pagination<Packing> getAll(PaginationParams paginationParams) {
		FilterPacking filterPacking = (FilterPacking) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterPacking.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterPacking.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterPacking.getNome(), MatchMode.ANYWHERE));
		}

		return new Paginator<Packing>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Packing> filter(PaginationParams paginationParams) {
		List<Packing> list = new ArrayList<Packing>();
		FilterPacking filterPacking = (FilterPacking) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterPacking.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterPacking.getNome()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
	@Override
	public Pagination<Packing> getAll(PaginationParams paginationParams, Client owner) {
		FilterPacking filterPacking = (FilterPacking) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		countCriteria.add(Restrictions.eq("owner", owner));
		
		if (filterPacking.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterPacking.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterPacking.getNome(), MatchMode.ANYWHERE));
		}
	return new Paginator<Packing>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	

	public List<Packing> filter(PaginationParams paginationParams, Client owner) {
		List<Packing> list = new ArrayList<Packing>();
		FilterPacking filterPacking = (FilterPacking) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		if (filterPacking.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterPacking.getNome()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
	
}
