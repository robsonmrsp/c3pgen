package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.Variedade;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterVariedade;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.Variedade;
/**
*  generated: 02/09/2016 16:23:48
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoVariedade extends AccessibleHibernateDao<Variedade> {
	private static final Logger LOGGER = Logger.getLogger(DaoVariedade.class);

	public DaoVariedade() {
		super(Variedade.class);
	}

	@Override
	public Pagination<Variedade> getAll(PaginationParams paginationParams) {
		FilterVariedade filterVariedade = (FilterVariedade) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterVariedade.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterVariedade.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterVariedade.getNome(), MatchMode.ANYWHERE));
		}

		return new Paginator<Variedade>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Variedade> filter(PaginationParams paginationParams) {
		List<Variedade> list = new ArrayList<Variedade>();
		FilterVariedade filterVariedade = (FilterVariedade) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterVariedade.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterVariedade.getNome()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
