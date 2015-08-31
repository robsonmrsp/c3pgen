package br.com.c3pgen.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.c3pgen.model.Cliente;
import br.com.c3pgen.model.filter.FilterCliente;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.persistence.pagination.Paginator;

import br.com.c3pgen.model.Cliente;
/**
*  generated: 30/08/2015 20:23:12
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoCliente extends AccessibleHibernateDao<Cliente> {
	private static final Logger LOGGER = Logger.getLogger(DaoCliente.class);

	public DaoCliente() {
		super(Cliente.class);
	}
	public Cliente findByCpf(String cpf) {
		Cliente cliente = null;
		try {
			cliente = (Cliente) criteria().add(Restrictions.eq("cpf", cpf)).uniqueResult();
		} catch (Exception e) {
			LOGGER.error("Erro ao obter Cliente pelo cpf," + cpf, e);
		}
		return cliente;
	}

	@Override
	public Pagination<Cliente> getAll(PaginationParams paginationParams) {
		FilterCliente filterCliente = (FilterCliente) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterCliente.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterCliente.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterCliente.getNome(), MatchMode.ANYWHERE));
		}
		if (filterCliente.getEmail() != null) {
			searchCriteria.add(Restrictions.ilike("email", filterCliente.getEmail(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("email", filterCliente.getEmail(), MatchMode.ANYWHERE));
		}
		if (filterCliente.getCpf() != null) {
			searchCriteria.add(Restrictions.ilike("cpf", filterCliente.getCpf(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("cpf", filterCliente.getCpf(), MatchMode.ANYWHERE));
		}
		if (filterCliente.getTelefone() != null) {
			searchCriteria.add(Restrictions.ilike("telefone", filterCliente.getTelefone(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("telefone", filterCliente.getTelefone(), MatchMode.ANYWHERE));
		}
		if (filterCliente.getOutroTelefone() != null) {
			searchCriteria.add(Restrictions.ilike("outroTelefone", filterCliente.getOutroTelefone(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("outroTelefone", filterCliente.getOutroTelefone(), MatchMode.ANYWHERE));
		}

		return new Paginator<Cliente>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Cliente> filter(PaginationParams paginationParams) {
		List<Cliente> list = new ArrayList<Cliente>();
		FilterCliente filterCliente = (FilterCliente) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterCliente.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterCliente.getNome()));
		}
		if (filterCliente.getEmail() != null) {
			searchCriteria.add(Restrictions.eq("email", filterCliente.getEmail()));
		}
		if (filterCliente.getCpf() != null) {
			searchCriteria.add(Restrictions.eq("cpf", filterCliente.getCpf()));
		}
		if (filterCliente.getTelefone() != null) {
			searchCriteria.add(Restrictions.eq("telefone", filterCliente.getTelefone()));
		}
		if (filterCliente.getOutroTelefone() != null) {
			searchCriteria.add(Restrictions.eq("outroTelefone", filterCliente.getOutroTelefone()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
