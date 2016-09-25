package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.Estado;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterEstado;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.Estado;
/**
*  generated: 24/09/2016 12:52:16
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoEstado extends AccessibleHibernateDao<Estado> {
	private static final Logger LOGGER = Logger.getLogger(DaoEstado.class);

	public DaoEstado() {
		super(Estado.class);
	}
	public Estado findByNome(String nome) {
		Estado estado = null;
		try {
			estado = (Estado) criteria().add(Restrictions.eq("nome", nome)).uniqueResult();
		} catch (Exception e) {
			LOGGER.error("Erro ao obter Estado pelo nome," + nome, e);
		}
		return estado;
	}

	@Override
	public Pagination<Estado> getAll(PaginationParams paginationParams) {
		FilterEstado filterEstado = (FilterEstado) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterEstado.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterEstado.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterEstado.getNome(), MatchMode.ANYWHERE));
		}
		if (filterEstado.getFaixaCep1Ini() != null) {
			searchCriteria.add(Restrictions.ilike("faixaCep1Ini", filterEstado.getFaixaCep1Ini(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("faixaCep1Ini", filterEstado.getFaixaCep1Ini(), MatchMode.ANYWHERE));
		}
		if (filterEstado.getFaixaCep1Fim() != null) {
			searchCriteria.add(Restrictions.ilike("faixaCep1Fim", filterEstado.getFaixaCep1Fim(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("faixaCep1Fim", filterEstado.getFaixaCep1Fim(), MatchMode.ANYWHERE));
		}
		if (filterEstado.getFaixaCep2Ini() != null) {
			searchCriteria.add(Restrictions.ilike("faixaCep2Ini", filterEstado.getFaixaCep2Ini(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("faixaCep2Ini", filterEstado.getFaixaCep2Ini(), MatchMode.ANYWHERE));
		}
		if (filterEstado.getFaixaCep2Fim() != null) {
			searchCriteria.add(Restrictions.ilike("faixaCep2Fim", filterEstado.getFaixaCep2Fim(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("faixaCep2Fim", filterEstado.getFaixaCep2Fim(), MatchMode.ANYWHERE));
		}

		return new Paginator<Estado>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Estado> filter(PaginationParams paginationParams) {
		List<Estado> list = new ArrayList<Estado>();
		FilterEstado filterEstado = (FilterEstado) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterEstado.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterEstado.getNome()));
		}
		if (filterEstado.getFaixaCep1Ini() != null) {
			searchCriteria.add(Restrictions.eq("faixaCep1Ini", filterEstado.getFaixaCep1Ini()));
		}
		if (filterEstado.getFaixaCep1Fim() != null) {
			searchCriteria.add(Restrictions.eq("faixaCep1Fim", filterEstado.getFaixaCep1Fim()));
		}
		if (filterEstado.getFaixaCep2Ini() != null) {
			searchCriteria.add(Restrictions.eq("faixaCep2Ini", filterEstado.getFaixaCep2Ini()));
		}
		if (filterEstado.getFaixaCep2Fim() != null) {
			searchCriteria.add(Restrictions.eq("faixaCep2Fim", filterEstado.getFaixaCep2Fim()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
