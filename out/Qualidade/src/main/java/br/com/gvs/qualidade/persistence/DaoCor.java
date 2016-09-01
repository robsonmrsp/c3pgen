package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.Cor;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterCor;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.Cor;
/**
*  generated: 01/09/2016 17:25:05
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoCor extends AccessibleHibernateDao<Cor> {
	private static final Logger LOGGER = Logger.getLogger(DaoCor.class);

	public DaoCor() {
		super(Cor.class);
	}

	@Override
	public Pagination<Cor> getAll(PaginationParams paginationParams) {
		FilterCor filterCor = (FilterCor) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterCor.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterCor.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterCor.getNome(), MatchMode.ANYWHERE));
		}

		return new Paginator<Cor>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Cor> filter(PaginationParams paginationParams) {
		List<Cor> list = new ArrayList<Cor>();
		FilterCor filterCor = (FilterCor) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterCor.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterCor.getNome()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
