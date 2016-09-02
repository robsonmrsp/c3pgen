package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.Funcionario;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterFuncionario;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.Funcionario;
import br.com.gvs.qualidade.model.Client;
/**
*  generated: 02/09/2016 16:23:48
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoFuncionario extends AccessibleHibernateDao<Funcionario> {
	private static final Logger LOGGER = Logger.getLogger(DaoFuncionario.class);

	public DaoFuncionario() {
		super(Funcionario.class);
	}

	@Override
	public Pagination<Funcionario> getAll(PaginationParams paginationParams) {
		FilterFuncionario filterFuncionario = (FilterFuncionario) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterFuncionario.getMatricula() != null) {
			searchCriteria.add(Restrictions.ilike("matricula", filterFuncionario.getMatricula(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("matricula", filterFuncionario.getMatricula(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getFoto() != null) {
			searchCriteria.add(Restrictions.ilike("foto", filterFuncionario.getFoto(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("foto", filterFuncionario.getFoto(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterFuncionario.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterFuncionario.getNome(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getTelefone() != null) {
			searchCriteria.add(Restrictions.ilike("telefone", filterFuncionario.getTelefone(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("telefone", filterFuncionario.getTelefone(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getTelefone2() != null) {
			searchCriteria.add(Restrictions.ilike("telefone2", filterFuncionario.getTelefone2(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("telefone2", filterFuncionario.getTelefone2(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getSexo() != null) {
			searchCriteria.add(Restrictions.ilike("sexo", filterFuncionario.getSexo(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("sexo", filterFuncionario.getSexo(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getDataNascimento() != null) {
			searchCriteria.add(Restrictions.eq("dataNascimento", filterFuncionario.getDataNascimento()));
			countCriteria.add(Restrictions.eq("dataNascimento", filterFuncionario.getDataNascimento()));
		}				
		if (filterFuncionario.getSalario() != null) {
			searchCriteria.add(Restrictions.eq("salario", filterFuncionario.getSalario()));
			countCriteria.add(Restrictions.eq("salario", filterFuncionario.getSalario()));
		}				
		if (filterFuncionario.getEscolaridade() != null) {
			searchCriteria.add(Restrictions.ilike("escolaridade", filterFuncionario.getEscolaridade(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("escolaridade", filterFuncionario.getEscolaridade(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getDataAdmissao() != null) {
			searchCriteria.add(Restrictions.eq("dataAdmissao", filterFuncionario.getDataAdmissao()));
			countCriteria.add(Restrictions.eq("dataAdmissao", filterFuncionario.getDataAdmissao()));
		}				
		if (filterFuncionario.getDataDemissao() != null) {
			searchCriteria.add(Restrictions.eq("dataDemissao", filterFuncionario.getDataDemissao()));
			countCriteria.add(Restrictions.eq("dataDemissao", filterFuncionario.getDataDemissao()));
		}				
		if (filterFuncionario.getValorHoraExtra() != null) {
			searchCriteria.add(Restrictions.eq("valorHoraExtra", filterFuncionario.getValorHoraExtra()));
			countCriteria.add(Restrictions.eq("valorHoraExtra", filterFuncionario.getValorHoraExtra()));
		}				
		if (filterFuncionario.getCarteiraTrabalho() != null) {
			searchCriteria.add(Restrictions.ilike("carteiraTrabalho", filterFuncionario.getCarteiraTrabalho(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("carteiraTrabalho", filterFuncionario.getCarteiraTrabalho(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getRg() != null) {
			searchCriteria.add(Restrictions.ilike("rg", filterFuncionario.getRg(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("rg", filterFuncionario.getRg(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getRgOrgaoEmissor() != null) {
			searchCriteria.add(Restrictions.ilike("rgOrgaoEmissor", filterFuncionario.getRgOrgaoEmissor(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("rgOrgaoEmissor", filterFuncionario.getRgOrgaoEmissor(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getNomeBanco() != null) {
			searchCriteria.add(Restrictions.ilike("nomeBanco", filterFuncionario.getNomeBanco(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nomeBanco", filterFuncionario.getNomeBanco(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getBancoNumeroAgencia() != null) {
			searchCriteria.add(Restrictions.ilike("bancoNumeroAgencia", filterFuncionario.getBancoNumeroAgencia(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("bancoNumeroAgencia", filterFuncionario.getBancoNumeroAgencia(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getBancoNumeroConta() != null) {
			searchCriteria.add(Restrictions.ilike("bancoNumeroConta", filterFuncionario.getBancoNumeroConta(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("bancoNumeroConta", filterFuncionario.getBancoNumeroConta(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getPis() != null) {
			searchCriteria.add(Restrictions.ilike("pis", filterFuncionario.getPis(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("pis", filterFuncionario.getPis(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getCargo() != null) {
			searchCriteria.createAlias("cargo", "cargo_");
			countCriteria.createAlias("cargo", "cargo_");
			searchCriteria.add(Restrictions.eq("cargo_.id", filterFuncionario.getCargo()));
			countCriteria.add(Restrictions.eq("cargo_.id", filterFuncionario.getCargo()));
		}
		if (filterFuncionario.getCbo() != null) {
			searchCriteria.createAlias("cbo", "cbo_");
			countCriteria.createAlias("cbo", "cbo_");
			searchCriteria.add(Restrictions.eq("cbo_.id", filterFuncionario.getCbo()));
			countCriteria.add(Restrictions.eq("cbo_.id", filterFuncionario.getCbo()));
		}
		if (filterFuncionario.getDepartamento() != null) {
			searchCriteria.createAlias("departamento", "departamento_");
			countCriteria.createAlias("departamento", "departamento_");
			searchCriteria.add(Restrictions.eq("departamento_.id", filterFuncionario.getDepartamento()));
			countCriteria.add(Restrictions.eq("departamento_.id", filterFuncionario.getDepartamento()));
		}
		if (filterFuncionario.getFuncao() != null) {
			searchCriteria.createAlias("funcao", "funcao_");
			countCriteria.createAlias("funcao", "funcao_");
			searchCriteria.add(Restrictions.eq("funcao_.id", filterFuncionario.getFuncao()));
			countCriteria.add(Restrictions.eq("funcao_.id", filterFuncionario.getFuncao()));
		}

		return new Paginator<Funcionario>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Funcionario> filter(PaginationParams paginationParams) {
		List<Funcionario> list = new ArrayList<Funcionario>();
		FilterFuncionario filterFuncionario = (FilterFuncionario) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterFuncionario.getMatricula() != null) {
			searchCriteria.add(Restrictions.eq("matricula", filterFuncionario.getMatricula()));
		}
		if (filterFuncionario.getFoto() != null) {
			searchCriteria.add(Restrictions.eq("foto", filterFuncionario.getFoto()));
		}
		if (filterFuncionario.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterFuncionario.getNome()));
		}
		if (filterFuncionario.getTelefone() != null) {
			searchCriteria.add(Restrictions.eq("telefone", filterFuncionario.getTelefone()));
		}
		if (filterFuncionario.getTelefone2() != null) {
			searchCriteria.add(Restrictions.eq("telefone2", filterFuncionario.getTelefone2()));
		}
		if (filterFuncionario.getSexo() != null) {
			searchCriteria.add(Restrictions.eq("sexo", filterFuncionario.getSexo()));
		}
		if (filterFuncionario.getDataNascimento() != null) {
			searchCriteria.add(Restrictions.eq("dataNascimento", filterFuncionario.getDataNascimento()));
		}
		if (filterFuncionario.getSalario() != null) {
			searchCriteria.add(Restrictions.eq("salario", filterFuncionario.getSalario()));
		}
		if (filterFuncionario.getEscolaridade() != null) {
			searchCriteria.add(Restrictions.eq("escolaridade", filterFuncionario.getEscolaridade()));
		}
		if (filterFuncionario.getDataAdmissao() != null) {
			searchCriteria.add(Restrictions.eq("dataAdmissao", filterFuncionario.getDataAdmissao()));
		}
		if (filterFuncionario.getDataDemissao() != null) {
			searchCriteria.add(Restrictions.eq("dataDemissao", filterFuncionario.getDataDemissao()));
		}
		if (filterFuncionario.getValorHoraExtra() != null) {
			searchCriteria.add(Restrictions.eq("valorHoraExtra", filterFuncionario.getValorHoraExtra()));
		}
		if (filterFuncionario.getCarteiraTrabalho() != null) {
			searchCriteria.add(Restrictions.eq("carteiraTrabalho", filterFuncionario.getCarteiraTrabalho()));
		}
		if (filterFuncionario.getRg() != null) {
			searchCriteria.add(Restrictions.eq("rg", filterFuncionario.getRg()));
		}
		if (filterFuncionario.getRgOrgaoEmissor() != null) {
			searchCriteria.add(Restrictions.eq("rgOrgaoEmissor", filterFuncionario.getRgOrgaoEmissor()));
		}
		if (filterFuncionario.getNomeBanco() != null) {
			searchCriteria.add(Restrictions.eq("nomeBanco", filterFuncionario.getNomeBanco()));
		}
		if (filterFuncionario.getBancoNumeroAgencia() != null) {
			searchCriteria.add(Restrictions.eq("bancoNumeroAgencia", filterFuncionario.getBancoNumeroAgencia()));
		}
		if (filterFuncionario.getBancoNumeroConta() != null) {
			searchCriteria.add(Restrictions.eq("bancoNumeroConta", filterFuncionario.getBancoNumeroConta()));
		}
		if (filterFuncionario.getPis() != null) {
			searchCriteria.add(Restrictions.eq("pis", filterFuncionario.getPis()));
		}
		if (filterFuncionario.getCargo() != null) {
			searchCriteria.createAlias("cargo", "cargo_");
			searchCriteria.add(Restrictions.eq("cargo_.id", filterFuncionario.getCargo()));
		}
		if (filterFuncionario.getCbo() != null) {
			searchCriteria.createAlias("cbo", "cbo_");
			searchCriteria.add(Restrictions.eq("cbo_.id", filterFuncionario.getCbo()));
		}
		if (filterFuncionario.getDepartamento() != null) {
			searchCriteria.createAlias("departamento", "departamento_");
			searchCriteria.add(Restrictions.eq("departamento_.id", filterFuncionario.getDepartamento()));
		}
		if (filterFuncionario.getFuncao() != null) {
			searchCriteria.createAlias("funcao", "funcao_");
			searchCriteria.add(Restrictions.eq("funcao_.id", filterFuncionario.getFuncao()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
	@Override
	public Pagination<Funcionario> getAll(PaginationParams paginationParams, Client owner) {
		FilterFuncionario filterFuncionario = (FilterFuncionario) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		countCriteria.add(Restrictions.eq("owner", owner));
		
		if (filterFuncionario.getMatricula() != null) {
			searchCriteria.add(Restrictions.ilike("matricula", filterFuncionario.getMatricula(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("matricula", filterFuncionario.getMatricula(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getFoto() != null) {
			searchCriteria.add(Restrictions.ilike("foto", filterFuncionario.getFoto(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("foto", filterFuncionario.getFoto(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getNome() != null) {
			searchCriteria.add(Restrictions.ilike("nome", filterFuncionario.getNome(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", filterFuncionario.getNome(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getTelefone() != null) {
			searchCriteria.add(Restrictions.ilike("telefone", filterFuncionario.getTelefone(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("telefone", filterFuncionario.getTelefone(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getTelefone2() != null) {
			searchCriteria.add(Restrictions.ilike("telefone2", filterFuncionario.getTelefone2(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("telefone2", filterFuncionario.getTelefone2(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getSexo() != null) {
			searchCriteria.add(Restrictions.ilike("sexo", filterFuncionario.getSexo(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("sexo", filterFuncionario.getSexo(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getDataNascimento() != null) {
			searchCriteria.add(Restrictions.eq("dataNascimento", filterFuncionario.getDataNascimento()));
			countCriteria.add(Restrictions.eq("dataNascimento", filterFuncionario.getDataNascimento()));
		}				
		if (filterFuncionario.getSalario() != null) {
			searchCriteria.add(Restrictions.eq("salario", filterFuncionario.getSalario()));
			countCriteria.add(Restrictions.eq("salario", filterFuncionario.getSalario()));
		}				
		if (filterFuncionario.getEscolaridade() != null) {
			searchCriteria.add(Restrictions.ilike("escolaridade", filterFuncionario.getEscolaridade(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("escolaridade", filterFuncionario.getEscolaridade(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getDataAdmissao() != null) {
			searchCriteria.add(Restrictions.eq("dataAdmissao", filterFuncionario.getDataAdmissao()));
			countCriteria.add(Restrictions.eq("dataAdmissao", filterFuncionario.getDataAdmissao()));
		}				
		if (filterFuncionario.getDataDemissao() != null) {
			searchCriteria.add(Restrictions.eq("dataDemissao", filterFuncionario.getDataDemissao()));
			countCriteria.add(Restrictions.eq("dataDemissao", filterFuncionario.getDataDemissao()));
		}				
		if (filterFuncionario.getValorHoraExtra() != null) {
			searchCriteria.add(Restrictions.eq("valorHoraExtra", filterFuncionario.getValorHoraExtra()));
			countCriteria.add(Restrictions.eq("valorHoraExtra", filterFuncionario.getValorHoraExtra()));
		}				
		if (filterFuncionario.getCarteiraTrabalho() != null) {
			searchCriteria.add(Restrictions.ilike("carteiraTrabalho", filterFuncionario.getCarteiraTrabalho(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("carteiraTrabalho", filterFuncionario.getCarteiraTrabalho(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getRg() != null) {
			searchCriteria.add(Restrictions.ilike("rg", filterFuncionario.getRg(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("rg", filterFuncionario.getRg(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getRgOrgaoEmissor() != null) {
			searchCriteria.add(Restrictions.ilike("rgOrgaoEmissor", filterFuncionario.getRgOrgaoEmissor(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("rgOrgaoEmissor", filterFuncionario.getRgOrgaoEmissor(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getNomeBanco() != null) {
			searchCriteria.add(Restrictions.ilike("nomeBanco", filterFuncionario.getNomeBanco(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("nomeBanco", filterFuncionario.getNomeBanco(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getBancoNumeroAgencia() != null) {
			searchCriteria.add(Restrictions.ilike("bancoNumeroAgencia", filterFuncionario.getBancoNumeroAgencia(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("bancoNumeroAgencia", filterFuncionario.getBancoNumeroAgencia(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getBancoNumeroConta() != null) {
			searchCriteria.add(Restrictions.ilike("bancoNumeroConta", filterFuncionario.getBancoNumeroConta(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("bancoNumeroConta", filterFuncionario.getBancoNumeroConta(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getPis() != null) {
			searchCriteria.add(Restrictions.ilike("pis", filterFuncionario.getPis(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("pis", filterFuncionario.getPis(), MatchMode.ANYWHERE));
		}
		if (filterFuncionario.getCargo() != null) {
			searchCriteria.createAlias("cargo", "cargo_");
			countCriteria.createAlias("cargo", "cargo_");
			searchCriteria.add(Restrictions.eq("cargo_.id", filterFuncionario.getCargo()));
			countCriteria.add(Restrictions.eq("cargo_.id", filterFuncionario.getCargo()));
		}
		if (filterFuncionario.getCbo() != null) {
			searchCriteria.createAlias("cbo", "cbo_");
			countCriteria.createAlias("cbo", "cbo_");
			searchCriteria.add(Restrictions.eq("cbo_.id", filterFuncionario.getCbo()));
			countCriteria.add(Restrictions.eq("cbo_.id", filterFuncionario.getCbo()));
		}
		if (filterFuncionario.getDepartamento() != null) {
			searchCriteria.createAlias("departamento", "departamento_");
			countCriteria.createAlias("departamento", "departamento_");
			searchCriteria.add(Restrictions.eq("departamento_.id", filterFuncionario.getDepartamento()));
			countCriteria.add(Restrictions.eq("departamento_.id", filterFuncionario.getDepartamento()));
		}
		if (filterFuncionario.getFuncao() != null) {
			searchCriteria.createAlias("funcao", "funcao_");
			countCriteria.createAlias("funcao", "funcao_");
			searchCriteria.add(Restrictions.eq("funcao_.id", filterFuncionario.getFuncao()));
			countCriteria.add(Restrictions.eq("funcao_.id", filterFuncionario.getFuncao()));
		}
	return new Paginator<Funcionario>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	

	public List<Funcionario> filter(PaginationParams paginationParams, Client owner) {
		List<Funcionario> list = new ArrayList<Funcionario>();
		FilterFuncionario filterFuncionario = (FilterFuncionario) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		if (filterFuncionario.getMatricula() != null) {
			searchCriteria.add(Restrictions.eq("matricula", filterFuncionario.getMatricula()));
		}
		if (filterFuncionario.getFoto() != null) {
			searchCriteria.add(Restrictions.eq("foto", filterFuncionario.getFoto()));
		}
		if (filterFuncionario.getNome() != null) {
			searchCriteria.add(Restrictions.eq("nome", filterFuncionario.getNome()));
		}
		if (filterFuncionario.getTelefone() != null) {
			searchCriteria.add(Restrictions.eq("telefone", filterFuncionario.getTelefone()));
		}
		if (filterFuncionario.getTelefone2() != null) {
			searchCriteria.add(Restrictions.eq("telefone2", filterFuncionario.getTelefone2()));
		}
		if (filterFuncionario.getSexo() != null) {
			searchCriteria.add(Restrictions.eq("sexo", filterFuncionario.getSexo()));
		}
		if (filterFuncionario.getDataNascimento() != null) {
			searchCriteria.add(Restrictions.eq("dataNascimento", filterFuncionario.getDataNascimento()));
		}
		if (filterFuncionario.getSalario() != null) {
			searchCriteria.add(Restrictions.eq("salario", filterFuncionario.getSalario()));
		}
		if (filterFuncionario.getEscolaridade() != null) {
			searchCriteria.add(Restrictions.eq("escolaridade", filterFuncionario.getEscolaridade()));
		}
		if (filterFuncionario.getDataAdmissao() != null) {
			searchCriteria.add(Restrictions.eq("dataAdmissao", filterFuncionario.getDataAdmissao()));
		}
		if (filterFuncionario.getDataDemissao() != null) {
			searchCriteria.add(Restrictions.eq("dataDemissao", filterFuncionario.getDataDemissao()));
		}
		if (filterFuncionario.getValorHoraExtra() != null) {
			searchCriteria.add(Restrictions.eq("valorHoraExtra", filterFuncionario.getValorHoraExtra()));
		}
		if (filterFuncionario.getCarteiraTrabalho() != null) {
			searchCriteria.add(Restrictions.eq("carteiraTrabalho", filterFuncionario.getCarteiraTrabalho()));
		}
		if (filterFuncionario.getRg() != null) {
			searchCriteria.add(Restrictions.eq("rg", filterFuncionario.getRg()));
		}
		if (filterFuncionario.getRgOrgaoEmissor() != null) {
			searchCriteria.add(Restrictions.eq("rgOrgaoEmissor", filterFuncionario.getRgOrgaoEmissor()));
		}
		if (filterFuncionario.getNomeBanco() != null) {
			searchCriteria.add(Restrictions.eq("nomeBanco", filterFuncionario.getNomeBanco()));
		}
		if (filterFuncionario.getBancoNumeroAgencia() != null) {
			searchCriteria.add(Restrictions.eq("bancoNumeroAgencia", filterFuncionario.getBancoNumeroAgencia()));
		}
		if (filterFuncionario.getBancoNumeroConta() != null) {
			searchCriteria.add(Restrictions.eq("bancoNumeroConta", filterFuncionario.getBancoNumeroConta()));
		}
		if (filterFuncionario.getPis() != null) {
			searchCriteria.add(Restrictions.eq("pis", filterFuncionario.getPis()));
		}
		if (filterFuncionario.getCargo() != null) {
			searchCriteria.createAlias("cargo", "cargo_");
			searchCriteria.add(Restrictions.eq("cargo_.id", filterFuncionario.getCargo()));
		}
		if (filterFuncionario.getCbo() != null) {
			searchCriteria.createAlias("cbo", "cbo_");
			searchCriteria.add(Restrictions.eq("cbo_.id", filterFuncionario.getCbo()));
		}
		if (filterFuncionario.getDepartamento() != null) {
			searchCriteria.createAlias("departamento", "departamento_");
			searchCriteria.add(Restrictions.eq("departamento_.id", filterFuncionario.getDepartamento()));
		}
		if (filterFuncionario.getFuncao() != null) {
			searchCriteria.createAlias("funcao", "funcao_");
			searchCriteria.add(Restrictions.eq("funcao_.id", filterFuncionario.getFuncao()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
	
}
