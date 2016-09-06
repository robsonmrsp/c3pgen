package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.Funcao;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterFuncao;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.Funcao;
/**
*  generated: 03/09/2016 22:18:32
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoFuncao extends AccessibleHibernateDao<Funcao> {
	private static final Logger LOGGER = Logger.getLogger(DaoFuncao.class);

	public DaoFuncao() {
		super(Funcao.class);
	}

	@Override
	public Pagination<Funcao> getAll(PaginationParams paginationParams) {
		FilterFuncao filterFuncao = (FilterFuncao) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterFuncao.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterFuncao.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterFuncao.getNome(), MatchMode.ANYWHERE));
		}
		if (filterFuncao.getDescricao() != null) {
			searchCriteria.add(Restrictions.ilike("descricao", filterFuncao.getDescricao(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("descricao", filterFuncao.getDescricao(), MatchMode.ANYWHERE));
		}

		return new Paginator<Funcao>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Funcao> filter(PaginationParams paginationParams) {
		List<Funcao> list = new ArrayList<Funcao>();
		FilterFuncao filterFuncao = (FilterFuncao) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterFuncao.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterFuncao.getNome()));
		}
		if (filterFuncao.getDescricao() != null) {
			searchCriteria.add(Restrictions.eq("descricao", filterFuncao.getDescricao()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
