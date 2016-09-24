package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.Departamento;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterDepartamento;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.Departamento;
import br.com.gvs.qualidade.model.Client;
/**
*  generated: 24/09/2016 11:56:34
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoDepartamento extends AccessibleHibernateDao<Departamento> {
	private static final Logger LOGGER = Logger.getLogger(DaoDepartamento.class);

	public DaoDepartamento() {
		super(Departamento.class);
	}

	@Override
	public Pagination<Departamento> getAll(PaginationParams paginationParams) {
		FilterDepartamento filterDepartamento = (FilterDepartamento) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterDepartamento.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterDepartamento.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterDepartamento.getNome(), MatchMode.ANYWHERE));
		}
		if (filterDepartamento.getDescricao() != null) {
			searchCriteria.add(Restrictions.ilike("descricao", filterDepartamento.getDescricao(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("descricao", filterDepartamento.getDescricao(), MatchMode.ANYWHERE));
		}

		return new Paginator<Departamento>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Departamento> filter(PaginationParams paginationParams) {
		List<Departamento> list = new ArrayList<Departamento>();
		FilterDepartamento filterDepartamento = (FilterDepartamento) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterDepartamento.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterDepartamento.getNome()));
		}
		if (filterDepartamento.getDescricao() != null) {
			searchCriteria.add(Restrictions.eq("descricao", filterDepartamento.getDescricao()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
	@Override
	public Pagination<Departamento> getAll(PaginationParams paginationParams, Client owner) {
		FilterDepartamento filterDepartamento = (FilterDepartamento) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		countCriteria.add(Restrictions.eq("owner", owner));
		
		if (filterDepartamento.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterDepartamento.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterDepartamento.getNome(), MatchMode.ANYWHERE));
		}
		if (filterDepartamento.getDescricao() != null) {
			searchCriteria.add(Restrictions.ilike("descricao", filterDepartamento.getDescricao(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("descricao", filterDepartamento.getDescricao(), MatchMode.ANYWHERE));
		}
	return new Paginator<Departamento>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	

	public List<Departamento> filter(PaginationParams paginationParams, Client owner) {
		List<Departamento> list = new ArrayList<Departamento>();
		FilterDepartamento filterDepartamento = (FilterDepartamento) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		if (filterDepartamento.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterDepartamento.getNome()));
		}
		if (filterDepartamento.getDescricao() != null) {
			searchCriteria.add(Restrictions.eq("descricao", filterDepartamento.getDescricao()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
	
}
