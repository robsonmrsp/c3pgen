package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.Bolsao;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterBolsao;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.Bolsao;
/**
*  generated: 02/09/2016 16:23:48
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoBolsao extends AccessibleHibernateDao<Bolsao> {
	private static final Logger LOGGER = Logger.getLogger(DaoBolsao.class);

	public DaoBolsao() {
		super(Bolsao.class);
	}

	@Override
	public Pagination<Bolsao> getAll(PaginationParams paginationParams) {
		FilterBolsao filterBolsao = (FilterBolsao) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterBolsao.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterBolsao.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterBolsao.getNome(), MatchMode.ANYWHERE));
		}

		return new Paginator<Bolsao>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Bolsao> filter(PaginationParams paginationParams) {
		List<Bolsao> list = new ArrayList<Bolsao>();
		FilterBolsao filterBolsao = (FilterBolsao) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterBolsao.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterBolsao.getNome()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
