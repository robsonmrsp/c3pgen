package br.com.c3pgen.persistence;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.c3pgen.model.Client;
import br.com.c3pgen.model.ItemModulo;
import br.com.c3pgen.model.filter.FilterItemModulo;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.persistence.pagination.Paginator;
/**
*  generated: 05/08/2016 15:23:43
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoItemModulo extends AccessibleHibernateDao<ItemModulo> {
	private static final Logger LOGGER = Logger.getLogger(DaoItemModulo.class);

	public DaoItemModulo() {
		super(ItemModulo.class);
	}

	@Override
	public Pagination<ItemModulo> getAll(PaginationParams paginationParams) {
		FilterItemModulo filterItemModulo = (FilterItemModulo) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterItemModulo.getName() != null) {
			searchCriteria.add(Restrictions.ilike("name", filterItemModulo.getName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("name", filterItemModulo.getName(), MatchMode.ANYWHERE));
		}
		if (filterItemModulo.getYamlContent() != null) {
			searchCriteria.add(Restrictions.ilike("yamlContent", filterItemModulo.getYamlContent(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("yamlContent", filterItemModulo.getYamlContent(), MatchMode.ANYWHERE));
		}
		if (filterItemModulo.getModulo() != null) {
			searchCriteria.createAlias("modulo", "modulo_");
			countCriteria.createAlias("modulo", "modulo_");
			searchCriteria.add(Restrictions.eq("modulo_.id", filterItemModulo.getModulo()));
			countCriteria.add(Restrictions.eq("modulo_.id", filterItemModulo.getModulo()));
		}

		return new Paginator<ItemModulo>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<ItemModulo> filter(PaginationParams paginationParams) {
		List<ItemModulo> list = new ArrayList<ItemModulo>();
		FilterItemModulo filterItemModulo = (FilterItemModulo) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterItemModulo.getName() != null) {
			searchCriteria.add(Restrictions.eq("name", filterItemModulo.getName()));
		}
		if (filterItemModulo.getYamlContent() != null) {
			searchCriteria.add(Restrictions.eq("yamlContent", filterItemModulo.getYamlContent()));
		}
		if (filterItemModulo.getModulo() != null) {
			searchCriteria.createAlias("modulo", "modulo_");
			searchCriteria.add(Restrictions.eq("modulo_.id", filterItemModulo.getModulo()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
	@Override
	public Pagination<ItemModulo> getAll(PaginationParams paginationParams, Client owner) {
		FilterItemModulo filterItemModulo = (FilterItemModulo) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		countCriteria.add(Restrictions.eq("owner", owner));
		
		if (filterItemModulo.getName() != null) {
			searchCriteria.add(Restrictions.ilike("name", filterItemModulo.getName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("name", filterItemModulo.getName(), MatchMode.ANYWHERE));
		}
		if (filterItemModulo.getYamlContent() != null) {
			searchCriteria.add(Restrictions.ilike("yamlContent", filterItemModulo.getYamlContent(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("yamlContent", filterItemModulo.getYamlContent(), MatchMode.ANYWHERE));
		}
		if (filterItemModulo.getModulo() != null) {
			searchCriteria.createAlias("modulo", "modulo_");
			countCriteria.createAlias("modulo", "modulo_");
			searchCriteria.add(Restrictions.eq("modulo_.id", filterItemModulo.getModulo()));
			countCriteria.add(Restrictions.eq("modulo_.id", filterItemModulo.getModulo()));
		}
	return new Paginator<ItemModulo>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	

	public List<ItemModulo> filter(PaginationParams paginationParams, Client owner) {
		List<ItemModulo> list = new ArrayList<ItemModulo>();
		FilterItemModulo filterItemModulo = (FilterItemModulo) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		if (filterItemModulo.getName() != null) {
			searchCriteria.add(Restrictions.eq("name", filterItemModulo.getName()));
		}
		if (filterItemModulo.getYamlContent() != null) {
			searchCriteria.add(Restrictions.eq("yamlContent", filterItemModulo.getYamlContent()));
		}
		if (filterItemModulo.getModulo() != null) {
			searchCriteria.createAlias("modulo", "modulo_");
			searchCriteria.add(Restrictions.eq("modulo_.id", filterItemModulo.getModulo()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
	
}
