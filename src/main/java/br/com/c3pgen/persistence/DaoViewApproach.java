package br.com.c3pgen.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.c3pgen.model.ViewApproach;
import br.com.c3pgen.model.filter.FilterViewApproach;
import br.com.c3pgen.persistence.pagination.Pagination;
import br.com.c3pgen.persistence.pagination.PaginationParams;
import br.com.c3pgen.persistence.pagination.Paginator;

import br.com.c3pgen.model.ViewApproach;
import br.com.c3pgen.model.Client;
/**
*  generated: 30/08/2015 20:23:12
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoViewApproach extends AccessibleHibernateDao<ViewApproach> {
	private static final Logger LOGGER = Logger.getLogger(DaoViewApproach.class);

	public DaoViewApproach() {
		super(ViewApproach.class);
	}

	@Override
	public Pagination<ViewApproach> getAll(PaginationParams paginationParams) {
		FilterViewApproach filterViewApproach = (FilterViewApproach) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		if (filterViewApproach.getType() != null) {
			searchCriteria.add(Restrictions.ilike("type", filterViewApproach.getType(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("type", filterViewApproach.getType(), MatchMode.ANYWHERE));
		}
		if (filterViewApproach.getComboId() != null) {
			searchCriteria.add(Restrictions.ilike("comboId", filterViewApproach.getComboId(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("comboId", filterViewApproach.getComboId(), MatchMode.ANYWHERE));
		}
		if (filterViewApproach.getComboName() != null) {
			searchCriteria.add(Restrictions.ilike("comboName", filterViewApproach.getComboName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("comboName", filterViewApproach.getComboName(), MatchMode.ANYWHERE));
		}
		if (filterViewApproach.getComboVal() != null) {
			searchCriteria.add(Restrictions.ilike("comboVal", filterViewApproach.getComboVal(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("comboVal", filterViewApproach.getComboVal(), MatchMode.ANYWHERE));
		}
		if (filterViewApproach.getTextField() != null) {
			searchCriteria.add(Restrictions.ilike("textField", filterViewApproach.getTextField(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("textField", filterViewApproach.getTextField(), MatchMode.ANYWHERE));
		}
		if (filterViewApproach.getHiddenField() != null) {
			searchCriteria.add(Restrictions.ilike("hiddenField", filterViewApproach.getHiddenField(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("hiddenField", filterViewApproach.getHiddenField(), MatchMode.ANYWHERE));
		}

		return new Paginator<ViewApproach>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<ViewApproach> filter(PaginationParams paginationParams) {
		List<ViewApproach> list = new ArrayList<ViewApproach>();
		FilterViewApproach filterViewApproach = (FilterViewApproach) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		if (filterViewApproach.getType() != null) {
			searchCriteria.add(Restrictions.eq("type", filterViewApproach.getType()));
		}
		if (filterViewApproach.getComboId() != null) {
			searchCriteria.add(Restrictions.eq("comboId", filterViewApproach.getComboId()));
		}
		if (filterViewApproach.getComboName() != null) {
			searchCriteria.add(Restrictions.eq("comboName", filterViewApproach.getComboName()));
		}
		if (filterViewApproach.getComboVal() != null) {
			searchCriteria.add(Restrictions.eq("comboVal", filterViewApproach.getComboVal()));
		}
		if (filterViewApproach.getTextField() != null) {
			searchCriteria.add(Restrictions.eq("textField", filterViewApproach.getTextField()));
		}
		if (filterViewApproach.getHiddenField() != null) {
			searchCriteria.add(Restrictions.eq("hiddenField", filterViewApproach.getHiddenField()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
	@Override
	public Pagination<ViewApproach> getAll(PaginationParams paginationParams, Client owner) {
		FilterViewApproach filterViewApproach = (FilterViewApproach) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		countCriteria.add(Restrictions.eq("owner", owner));
		
		if (filterViewApproach.getType() != null) {
			searchCriteria.add(Restrictions.ilike("type", filterViewApproach.getType(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("type", filterViewApproach.getType(), MatchMode.ANYWHERE));
		}
		if (filterViewApproach.getComboId() != null) {
			searchCriteria.add(Restrictions.ilike("comboId", filterViewApproach.getComboId(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("comboId", filterViewApproach.getComboId(), MatchMode.ANYWHERE));
		}
		if (filterViewApproach.getComboName() != null) {
			searchCriteria.add(Restrictions.ilike("comboName", filterViewApproach.getComboName(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("comboName", filterViewApproach.getComboName(), MatchMode.ANYWHERE));
		}
		if (filterViewApproach.getComboVal() != null) {
			searchCriteria.add(Restrictions.ilike("comboVal", filterViewApproach.getComboVal(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("comboVal", filterViewApproach.getComboVal(), MatchMode.ANYWHERE));
		}
		if (filterViewApproach.getTextField() != null) {
			searchCriteria.add(Restrictions.ilike("textField", filterViewApproach.getTextField(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("textField", filterViewApproach.getTextField(), MatchMode.ANYWHERE));
		}
		if (filterViewApproach.getHiddenField() != null) {
			searchCriteria.add(Restrictions.ilike("hiddenField", filterViewApproach.getHiddenField(), MatchMode.ANYWHERE));
			countCriteria.add(Restrictions.ilike("hiddenField", filterViewApproach.getHiddenField(), MatchMode.ANYWHERE));
		}
	return new Paginator<ViewApproach>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	

	public List<ViewApproach> filter(PaginationParams paginationParams, Client owner) {
		List<ViewApproach> list = new ArrayList<ViewApproach>();
		FilterViewApproach filterViewApproach = (FilterViewApproach) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		searchCriteria.add(Restrictions.eq("owner", owner));
		if (filterViewApproach.getType() != null) {
			searchCriteria.add(Restrictions.eq("type", filterViewApproach.getType()));
		}
		if (filterViewApproach.getComboId() != null) {
			searchCriteria.add(Restrictions.eq("comboId", filterViewApproach.getComboId()));
		}
		if (filterViewApproach.getComboName() != null) {
			searchCriteria.add(Restrictions.eq("comboName", filterViewApproach.getComboName()));
		}
		if (filterViewApproach.getComboVal() != null) {
			searchCriteria.add(Restrictions.eq("comboVal", filterViewApproach.getComboVal()));
		}
		if (filterViewApproach.getTextField() != null) {
			searchCriteria.add(Restrictions.eq("textField", filterViewApproach.getTextField()));
		}
		if (filterViewApproach.getHiddenField() != null) {
			searchCriteria.add(Restrictions.eq("hiddenField", filterViewApproach.getHiddenField()));
		}

		list.addAll(searchCriteria.list());
		return list;
	}
	
}
