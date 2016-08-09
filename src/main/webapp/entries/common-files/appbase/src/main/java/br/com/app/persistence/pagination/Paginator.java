package ${application.corePackage}.persistence.pagination;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;


import org.hibernate.sql.JoinType;

import ${application.corePackage}.utils.Util;
public class Paginator<T> {

	private final Criteria searchCriteria;
	private Criteria countCriteria;

	public Paginator(Criteria searchCriteria, Criteria countCriteria) {
		this.searchCriteria = searchCriteria;
		this.countCriteria = countCriteria;
	}

	public final Pagination<T> paginate(PaginationParams paginationParams) {
		final Long totalRecords = totalRecords(paginationParams);

		List<T> results = generateList(paginationParams);

		return new Pagination<T>(totalRecords, results);
	}

	@SuppressWarnings("unchecked")
	private List<T> generateList(PaginationParams paginationParams) {
		List<T> result = new ArrayList<T>();
		Integer firstResults = paginationParams.getFirstResults();
		Integer pageSize = paginationParams.getPageSize();

		Criteria criteria = adjusteCriteriaBySearchParams(paginationParams);

		result.addAll(criteria.setFirstResult(firstResults).setMaxResults(pageSize).list());

		return result;
	}


	private Criteria adjusteCriteriaBySearchParams(PaginationParams paginationParams) {
		searchCriteria.setProjection(null);
		searchCriteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		Map<String, Object> searchParams = paginationParams.getSearchParams();

		Set<String> paranKeySet = searchParams.keySet();
		Object paranValue = "";

		for (String propertyName : paranKeySet) {
			if (paranValue instanceof String) {
				searchCriteria.add(Restrictions.ilike(propertyName, paranValue.toString(), MatchMode.ANYWHERE));
			} else {
				searchCriteria.add(Restrictions.eq(propertyName, paranValue));
			}
		}

		String orderBy = paginationParams.getOrderBy();
		if (!orderBy.isEmpty()) {
			String[] ord = null;
			String order = paginationParams.getOrder();
			if (orderBy.contains(".")) {
				ord = orderBy.split("\\.");
				if (!Util.elementHasProperty(paginationParams.getFilter(), ord[0])) {
					searchCriteria.createAlias(ord[0], ord[0] + "_", JoinType.LEFT_OUTER_JOIN);
				}
				if (order.equalsIgnoreCase("DESC")) {
					searchCriteria.addOrder(Order.desc(ord[0] + "_." + ord[1]));
				} else {
					searchCriteria.addOrder(Order.asc(ord[0] + "_." + ord[1]));
				}

			} else {
				if (order.equalsIgnoreCase("DESC")) {
					searchCriteria.addOrder(Order.desc(orderBy));
				} else {
					searchCriteria.addOrder(Order.asc(orderBy));
				}
			}
		}
		return searchCriteria;
	}

	private Criteria adjusteCountCriteria(PaginationParams paginationParams) {
		countCriteria.setProjection(null);
		countCriteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		Map<String, Object> searchParams = paginationParams.getSearchParams();

		Set<String> paranKeySet = searchParams.keySet();
		Object paranValue = "";

		for (String propertyName : paranKeySet) {
			if (paranValue instanceof String) {
				countCriteria.add(Restrictions.ilike(propertyName, paranValue.toString(), MatchMode.ANYWHERE));
			} else {
				countCriteria.add(Restrictions.eq(propertyName, paranValue));
			}
		}
		return countCriteria;
	}

	private Long totalRecords(PaginationParams paginationParams) {
		adjusteCountCriteria(paginationParams);
		Long count = 0L;
		if (countCriteria != null) {
			Object cout = countCriteria.setProjection(Projections.countDistinct("id")).uniqueResult();
			// Gamba da porra TODO Ver depois porque essa bomba tá dando
			// classcastexception
			if (cout instanceof Long) {
				count = (Long) cout;
			} else if (cout instanceof Integer) {
				count = ((Integer) cout).longValue();
			}
			countCriteria.setProjection(null);
			countCriteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
		}
		return count;
	}
}