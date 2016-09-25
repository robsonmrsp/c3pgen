package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.ControleCumbuca;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterControleCumbuca;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.ControleCumbuca;
/**
*  generated: 24/09/2016 12:52:13
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoControleCumbuca extends AccessibleHibernateDao<ControleCumbuca> {
	private static final Logger LOGGER = Logger.getLogger(DaoControleCumbuca.class);

	public DaoControleCumbuca() {
		super(ControleCumbuca.class);
	}

	@Override
	public Pagination<ControleCumbuca> getAll(PaginationParams paginationParams) {
		FilterControleCumbuca filterControleCumbuca = (FilterControleCumbuca) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterControleCumbuca.getDataRegistro() != null) {
			searchCriteria.add(Restrictions.eq("dataRegistro", filterControleCumbuca.getDataRegistro()));
			countCriteria.add(Restrictions.eq("dataRegistro", filterControleCumbuca.getDataRegistro()));
		}				
		if (filterControleCumbuca.getPeso() != null) {
			searchCriteria.add(Restrictions.eq("peso", filterControleCumbuca.getPeso()));
			countCriteria.add(Restrictions.eq("peso", filterControleCumbuca.getPeso()));
		}				
		if (filterControleCumbuca.getTipo() != null) {
			searchCriteria.add(Restrictions.eq("tipo", filterControleCumbuca.getTipo()));
			countCriteria.add(Restrictions.eq("tipo", filterControleCumbuca.getTipo()));
		}				
		if (filterControleCumbuca.getQuantidadeCachos() != null) {
			searchCriteria.add(Restrictions.eq("quantidadeCachos", filterControleCumbuca.getQuantidadeCachos()));
			countCriteria.add(Restrictions.eq("quantidadeCachos", filterControleCumbuca.getQuantidadeCachos()));
		}				
		if (filterControleCumbuca.getCabine() != null) {
			searchCriteria.createAlias("cabine", "cabine_");
			countCriteria.createAlias("cabine", "cabine_");
			searchCriteria.add(Restrictions.eq("cabine_.id", filterControleCumbuca.getCabine()));
			countCriteria.add(Restrictions.eq("cabine_.id", filterControleCumbuca.getCabine()));
		}

		return new Paginator<ControleCumbuca>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<ControleCumbuca> filter(PaginationParams paginationParams) {
		List<ControleCumbuca> list = new ArrayList<ControleCumbuca>();
		FilterControleCumbuca filterControleCumbuca = (FilterControleCumbuca) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterControleCumbuca.getDataRegistro() != null) {
			searchCriteria.add(Restrictions.eq("dataRegistro", filterControleCumbuca.getDataRegistro()));
		}
		if (filterControleCumbuca.getPeso() != null) {
			searchCriteria.add(Restrictions.eq("peso", filterControleCumbuca.getPeso()));
		}
		if (filterControleCumbuca.getTipo() != null) {
			searchCriteria.add(Restrictions.eq("tipo", filterControleCumbuca.getTipo()));
		}
		if (filterControleCumbuca.getQuantidadeCachos() != null) {
			searchCriteria.add(Restrictions.eq("quantidadeCachos", filterControleCumbuca.getQuantidadeCachos()));
		}
		if (filterControleCumbuca.getCabine() != null) {
			searchCriteria.createAlias("cabine", "cabine_");
			searchCriteria.add(Restrictions.eq("cabine_.id", filterControleCumbuca.getCabine()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
