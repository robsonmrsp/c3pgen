package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.Anexo;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterAnexo;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.Anexo;
/**
*  generated: 03/09/2016 22:18:30
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoAnexo extends AccessibleHibernateDao<Anexo> {
	private static final Logger LOGGER = Logger.getLogger(DaoAnexo.class);

	public DaoAnexo() {
		super(Anexo.class);
	}

	@Override
	public Pagination<Anexo> getAll(PaginationParams paginationParams) {
		FilterAnexo filterAnexo = (FilterAnexo) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterAnexo.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterAnexo.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterAnexo.getNome(), MatchMode.ANYWHERE));
		}
		if (filterAnexo.getConteudo() != null) {
			searchCriteria.add(Restrictions.ilike("conteudo", filterAnexo.getConteudo(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("conteudo", filterAnexo.getConteudo(), MatchMode.ANYWHERE));
		}
		if (filterAnexo.getApontamentoQualidadePacking() != null) {
			searchCriteria.createAlias("apontamentoQualidadePacking", "apontamentoQualidadePacking_");
			countCriteria.createAlias("apontamentoQualidadePacking", "apontamentoQualidadePacking_");
			searchCriteria.add(Restrictions.eq("apontamentoQualidadePacking_.id", filterAnexo.getApontamentoQualidadePacking()));
			countCriteria.add(Restrictions.eq("apontamentoQualidadePacking_.id", filterAnexo.getApontamentoQualidadePacking()));
		}

		return new Paginator<Anexo>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Anexo> filter(PaginationParams paginationParams) {
		List<Anexo> list = new ArrayList<Anexo>();
		FilterAnexo filterAnexo = (FilterAnexo) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterAnexo.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterAnexo.getNome()));
		}
		if (filterAnexo.getConteudo() != null) {
			searchCriteria.add(Restrictions.eq("conteudo", filterAnexo.getConteudo()));
		}
		if (filterAnexo.getApontamentoQualidadePacking() != null) {
			searchCriteria.createAlias("apontamentoQualidadePacking", "apontamentoQualidadePacking_");
			searchCriteria.add(Restrictions.eq("apontamentoQualidadePacking_.id", filterAnexo.getApontamentoQualidadePacking()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
