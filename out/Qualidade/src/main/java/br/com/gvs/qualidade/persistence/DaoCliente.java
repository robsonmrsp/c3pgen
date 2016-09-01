package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.Cliente;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterCliente;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.Cliente;
/**
*  generated: 01/09/2016 17:25:05
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoCliente extends AccessibleHibernateDao<Cliente> {
	private static final Logger LOGGER = Logger.getLogger(DaoCliente.class);

	public DaoCliente() {
		super(Cliente.class);
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
		if (filterCliente.getNomeFantasia() != null) {
			searchCriteria.add(Restrictions.ilike("nomeFantasia", filterCliente.getNomeFantasia(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nomeFantasia", filterCliente.getNomeFantasia(), MatchMode.ANYWHERE));
		}
		if (filterCliente.getNomeContato() != null) {
			searchCriteria.add(Restrictions.ilike("nomeContato", filterCliente.getNomeContato(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nomeContato", filterCliente.getNomeContato(), MatchMode.ANYWHERE));
		}
		if (filterCliente.getTelefoneContato() != null) {
			searchCriteria.add(Restrictions.ilike("telefoneContato", filterCliente.getTelefoneContato(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("telefoneContato", filterCliente.getTelefoneContato(), MatchMode.ANYWHERE));
		}
		if (filterCliente.getRazaoSocial() != null) {
			searchCriteria.add(Restrictions.ilike("razaoSocial", filterCliente.getRazaoSocial(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("razaoSocial", filterCliente.getRazaoSocial(), MatchMode.ANYWHERE));
		}
		if (filterCliente.getObservacao() != null) {
			searchCriteria.add(Restrictions.ilike("observacao", filterCliente.getObservacao(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("observacao", filterCliente.getObservacao(), MatchMode.ANYWHERE));
		}
		if (filterCliente.getCpf() != null) {
			searchCriteria.add(Restrictions.ilike("cpf", filterCliente.getCpf(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("cpf", filterCliente.getCpf(), MatchMode.ANYWHERE));
		}
		if (filterCliente.getCnpj() != null) {
			searchCriteria.add(Restrictions.ilike("cnpj", filterCliente.getCnpj(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("cnpj", filterCliente.getCnpj(), MatchMode.ANYWHERE));
		}
		if (filterCliente.getEmail() != null) {
			searchCriteria.add(Restrictions.ilike("email", filterCliente.getEmail(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("email", filterCliente.getEmail(), MatchMode.ANYWHERE));
		}
		if (filterCliente.getEmail2() != null) {
			searchCriteria.add(Restrictions.ilike("email2", filterCliente.getEmail2(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("email2", filterCliente.getEmail2(), MatchMode.ANYWHERE));
		}
		if (filterCliente.getPessoaFisica() != null) {
			searchCriteria.add(Restrictions.ilike("pessoaFisica", filterCliente.getPessoaFisica(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("pessoaFisica", filterCliente.getPessoaFisica(), MatchMode.ANYWHERE));
		}
		if (filterCliente.getDataNascimento() != null) {
			searchCriteria.add(Restrictions.eq("dataNascimento", filterCliente.getDataNascimento()));
			countCriteria.add(Restrictions.eq("dataNascimento", filterCliente.getDataNascimento()));
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
		if (filterCliente.getNomeFantasia() != null) {
			searchCriteria.add(Restrictions.eq("nomeFantasia", filterCliente.getNomeFantasia()));
		}
		if (filterCliente.getNomeContato() != null) {
			searchCriteria.add(Restrictions.eq("nomeContato", filterCliente.getNomeContato()));
		}
		if (filterCliente.getTelefoneContato() != null) {
			searchCriteria.add(Restrictions.eq("telefoneContato", filterCliente.getTelefoneContato()));
		}
		if (filterCliente.getRazaoSocial() != null) {
			searchCriteria.add(Restrictions.eq("razaoSocial", filterCliente.getRazaoSocial()));
		}
		if (filterCliente.getObservacao() != null) {
			searchCriteria.add(Restrictions.eq("observacao", filterCliente.getObservacao()));
		}
		if (filterCliente.getCpf() != null) {
			searchCriteria.add(Restrictions.eq("cpf", filterCliente.getCpf()));
		}
		if (filterCliente.getCnpj() != null) {
			searchCriteria.add(Restrictions.eq("cnpj", filterCliente.getCnpj()));
		}
		if (filterCliente.getEmail() != null) {
			searchCriteria.add(Restrictions.eq("email", filterCliente.getEmail()));
		}
		if (filterCliente.getEmail2() != null) {
			searchCriteria.add(Restrictions.eq("email2", filterCliente.getEmail2()));
		}
		if (filterCliente.getPessoaFisica() != null) {
			searchCriteria.add(Restrictions.eq("pessoaFisica", filterCliente.getPessoaFisica()));
		}
		if (filterCliente.getDataNascimento() != null) {
			searchCriteria.add(Restrictions.eq("dataNascimento", filterCliente.getDataNascimento()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
}
