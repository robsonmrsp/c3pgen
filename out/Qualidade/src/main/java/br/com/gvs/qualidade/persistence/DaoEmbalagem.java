package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.Embalagem;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterEmbalagem;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.Embalagem;
/**
*  generated: 03/09/2016 22:18:32
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoEmbalagem extends AccessibleHibernateDao<Embalagem> {
	private static final Logger LOGGER = Logger.getLogger(DaoEmbalagem.class);

	public DaoEmbalagem() {
		super(Embalagem.class);
	}

	@Override
	public Pagination<Embalagem> getAll(PaginationParams paginationParams) {
		FilterEmbalagem filterEmbalagem = (FilterEmbalagem) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterEmbalagem.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterEmbalagem.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterEmbalagem.getNome(), MatchMode.ANYWHERE));
		}

		return new Paginator<Embalagem>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Embalagem> filter(PaginationParams paginationParams) {
		List<Embalagem> list = new ArrayList<Embalagem>();
		FilterEmbalagem filterEmbalagem = (FilterEmbalagem) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterEmbalagem.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterEmbalagem.getNome()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
