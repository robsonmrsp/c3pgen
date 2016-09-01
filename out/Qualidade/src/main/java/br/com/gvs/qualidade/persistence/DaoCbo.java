package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.Cbo;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterCbo;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.Cbo;
/**
*  generated: 01/09/2016 17:25:05
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoCbo extends AccessibleHibernateDao<Cbo> {
	private static final Logger LOGGER = Logger.getLogger(DaoCbo.class);

	public DaoCbo() {
		super(Cbo.class);
	}

	@Override
	public Pagination<Cbo> getAll(PaginationParams paginationParams) {
		FilterCbo filterCbo = (FilterCbo) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterCbo.getCodigo() != null) {
			searchCriteria.add(Restrictions.ilike("codigo", filterCbo.getCodigo(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("codigo", filterCbo.getCodigo(), MatchMode.ANYWHERE));
		}
		if (filterCbo.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterCbo.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterCbo.getNome(), MatchMode.ANYWHERE));
		}

		return new Paginator<Cbo>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Cbo> filter(PaginationParams paginationParams) {
		List<Cbo> list = new ArrayList<Cbo>();
		FilterCbo filterCbo = (FilterCbo) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterCbo.getCodigo() != null) {
			searchCriteria.add(Restrictions.eq("codigo", filterCbo.getCodigo()));
		}
		if (filterCbo.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterCbo.getNome()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
