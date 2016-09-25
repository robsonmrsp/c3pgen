package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.Pais;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterPais;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.Pais;
/**
*  generated: 24/09/2016 12:52:16
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoPais extends AccessibleHibernateDao<Pais> {
	private static final Logger LOGGER = Logger.getLogger(DaoPais.class);

	public DaoPais() {
		super(Pais.class);
	}

	@Override
	public Pagination<Pais> getAll(PaginationParams paginationParams) {
		FilterPais filterPais = (FilterPais) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterPais.getCodigo() != null) {
			searchCriteria.add(Restrictions.eq("codigo", filterPais.getCodigo()));
			countCriteria.add(Restrictions.eq("codigo", filterPais.getCodigo()));
		}				
		if (filterPais.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterPais.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterPais.getNome(), MatchMode.ANYWHERE));
		}

		return new Paginator<Pais>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Pais> filter(PaginationParams paginationParams) {
		List<Pais> list = new ArrayList<Pais>();
		FilterPais filterPais = (FilterPais) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterPais.getCodigo() != null) {
			searchCriteria.add(Restrictions.eq("codigo", filterPais.getCodigo()));
		}
		if (filterPais.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterPais.getNome()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
