package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.Cargo;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterCargo;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.Cargo;
/**
*  generated: 02/09/2016 16:23:48
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoCargo extends AccessibleHibernateDao<Cargo> {
	private static final Logger LOGGER = Logger.getLogger(DaoCargo.class);

	public DaoCargo() {
		super(Cargo.class);
	}

	@Override
	public Pagination<Cargo> getAll(PaginationParams paginationParams) {
		FilterCargo filterCargo = (FilterCargo) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterCargo.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterCargo.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterCargo.getNome(), MatchMode.ANYWHERE));
		}

		return new Paginator<Cargo>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Cargo> filter(PaginationParams paginationParams) {
		List<Cargo> list = new ArrayList<Cargo>();
		FilterCargo filterCargo = (FilterCargo) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterCargo.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterCargo.getNome()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
