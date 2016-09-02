package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.Generador;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterGenerador;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.Generador;
/**
*  generated: 02/09/2016 16:23:48
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoGenerador extends AccessibleHibernateDao<Generador> {
	private static final Logger LOGGER = Logger.getLogger(DaoGenerador.class);

	public DaoGenerador() {
		super(Generador.class);
	}

	@Override
	public Pagination<Generador> getAll(PaginationParams paginationParams) {
		FilterGenerador filterGenerador = (FilterGenerador) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterGenerador.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterGenerador.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterGenerador.getNome(), MatchMode.ANYWHERE));
		}

		return new Paginator<Generador>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Generador> filter(PaginationParams paginationParams) {
		List<Generador> list = new ArrayList<Generador>();
		FilterGenerador filterGenerador = (FilterGenerador) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterGenerador.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterGenerador.getNome()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
