package br.com.gvs.qualidade.persistence;

import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.qualidade.model.Client;
import br.com.gvs.core.persistence.AccessibleHibernateDao;
import br.com.gvs.qualidade.model.filter.FilterClient;
import br.com.gvs.core.persistence.pagination.Pagination;
import br.com.gvs.core.persistence.pagination.PaginationParams;
import br.com.gvs.core.persistence.pagination.Paginator;

import br.com.gvs.qualidade.model.Client;
/**
*  generated: 02/09/2016 16:23:48
**/

@Named
@SuppressWarnings("rawtypes")
public class DaoClient extends AccessibleHibernateDao<Client> {
	private static final Logger LOGGER = Logger.getLogger(DaoClient.class);

	public DaoClient() {
		super(Client.class);
	}

	@Override
	public Pagination<Client> getAll(PaginationParams paginationParams) {
		FilterClient filterClient = (FilterClient) paginationParams.getFilter();
		Criteria searchCriteria = criteria();
		Criteria countCriteria = criteria();

		return new Paginator<Client>(searchCriteria, countCriteria).paginate(paginationParams);
	}
	
	public List<Client> filter(PaginationParams paginationParams) {
		List<Client> list = new ArrayList<Client>();
		FilterClient filterClient = (FilterClient) paginationParams.getFilter();
		Criteria searchCriteria = criteria();

		list.addAll(searchCriteria.list());
		return list;
	}
}
