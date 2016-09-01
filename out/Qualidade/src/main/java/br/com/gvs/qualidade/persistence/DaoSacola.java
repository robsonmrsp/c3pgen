package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.Sacola;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterSacola;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.Sacola;
/**
*  generated: 01/09/2016 17:25:05
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoSacola extends AccessibleHibernateDao<Sacola> {
	private static final Logger LOGGER = Logger.getLogger(DaoSacola.class);

	public DaoSacola() {
		super(Sacola.class);
	}

	@Override
	public Pagination<Sacola> getAll(PaginationParams paginationParams) {
		FilterSacola filterSacola = (FilterSacola) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterSacola.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterSacola.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterSacola.getNome(), MatchMode.ANYWHERE));
		}

		return new Paginator<Sacola>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Sacola> filter(PaginationParams paginationParams) {
		List<Sacola> list = new ArrayList<Sacola>();
		FilterSacola filterSacola = (FilterSacola) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterSacola.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterSacola.getNome()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
