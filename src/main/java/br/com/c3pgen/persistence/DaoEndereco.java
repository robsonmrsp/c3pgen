package br.com.c3pgen.persistence;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.c3pgen.model.Endereco;
import br.com.c3pgen.model.filter.FilterEndereco;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.persistence.pagination.Paginator;
/**
*  generated: 03/09/2015 14:51:48
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoEndereco extends AccessibleHibernateDao<Endereco> {
	private static final Logger LOGGER = Logger.getLogger(DaoEndereco.class);

	public DaoEndereco() {
		super(Endereco.class);
	}

	@Override
	public Pagination<Endereco> getAll(PaginationParams paginationParams) {
		FilterEndereco filterEndereco = (FilterEndereco) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterEndereco.getComplemento() != null) {
			searchCriteria.add(Restrictions.ilike("complemento", filterEndereco.getComplemento(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("complemento", filterEndereco.getComplemento(), MatchMode.ANYWHERE));
		}
		if (filterEndereco.getNumero() != null) {
			searchCriteria.add(Restrictions.ilike("numero", filterEndereco.getNumero(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("numero", filterEndereco.getNumero(), MatchMode.ANYWHERE));
		}
		if (filterEndereco.getCep() != null) {
			searchCriteria.createAlias("cep", "cep_");
			countCriteria.createAlias("cep", "cep_");
			searchCriteria.add(Restrictions.eq("cep_.id", filterEndereco.getCep()));
			countCriteria.add(Restrictions.eq("cep_.id", filterEndereco.getCep()));
		}

		return new Paginator<Endereco>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Endereco> filter(PaginationParams paginationParams) {
		List<Endereco> list = new ArrayList<Endereco>();
		FilterEndereco filterEndereco = (FilterEndereco) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterEndereco.getComplemento() != null) {
			searchCriteria.add(Restrictions.eq("complemento", filterEndereco.getComplemento()));
		}
		if (filterEndereco.getNumero() != null) {
			searchCriteria.add(Restrictions.eq("numero", filterEndereco.getNumero()));
		}
		if (filterEndereco.getCep() != null) {
			searchCriteria.createAlias("cep", "cep_");
			searchCriteria.add(Restrictions.eq("cep_.id", filterEndereco.getCep()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
