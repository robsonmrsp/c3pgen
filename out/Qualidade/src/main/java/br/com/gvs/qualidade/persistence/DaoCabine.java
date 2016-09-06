package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.Cabine;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterCabine;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.Cabine;
/**
*  generated: 03/09/2016 22:18:31
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoCabine extends AccessibleHibernateDao<Cabine> {
	private static final Logger LOGGER = Logger.getLogger(DaoCabine.class);

	public DaoCabine() {
		super(Cabine.class);
	}

	@Override
	public Pagination<Cabine> getAll(PaginationParams paginationParams) {
		FilterCabine filterCabine = (FilterCabine) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterCabine.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterCabine.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterCabine.getNome(), MatchMode.ANYWHERE));
		}
		if (filterCabine.getPacking() != null) {
			searchCriteria.createAlias("packing", "packing_");
			countCriteria.createAlias("packing", "packing_");
			searchCriteria.add(Restrictions.eq("packing_.id", filterCabine.getPacking()));
			countCriteria.add(Restrictions.eq("packing_.id", filterCabine.getPacking()));
		}

		return new Paginator<Cabine>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Cabine> filter(PaginationParams paginationParams) {
		List<Cabine> list = new ArrayList<Cabine>();
		FilterCabine filterCabine = (FilterCabine) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterCabine.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterCabine.getNome()));
		}
		if (filterCabine.getPacking() != null) {
			searchCriteria.createAlias("packing", "packing_");
			searchCriteria.add(Restrictions.eq("packing_.id", filterCabine.getPacking()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
