package ${application.rootPackage}.persistence.pagination;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.UriInfo;

import ${application.rootPackage}.utils.Util;

public class PaginationParams<Filter> {

	private Integer page;
	private Integer pageSize;
	private Integer totalPages;
	private String orderBy;
	private String order;
	private Filter filter;

	private Map<String, Object> searchParams;

	private final Class<Filter> clazz;

	public PaginationParams(MultivaluedMap<String, String> pathParameters) {
		this(pathParameters, null);
	}

	public PaginationParams(UriInfo uriInfo) {
		this(uriInfo.getQueryParameters());
	}

	public PaginationParams(UriInfo uriInfo, Class<Filter> clazz) {
		this(uriInfo.getQueryParameters(), clazz);
	}

	public PaginationParams(MultivaluedMap<String, String> pathParameters, Class<Filter> clazz) {
		this(clazz);
		setPaginationValues(pathParameters);
		if (clazz != null)
			setFilter(createFilterObject(pathParameters));
	}

	private void setPaginationValues(MultivaluedMap<String, String> pathParameters) {
		page = pathParameters.get("page") != null ? Integer.valueOf(pathParameters.getFirst("page")) : 1;
		pageSize = pathParameters.get("pageSize") != null ? Integer.valueOf(pathParameters.getFirst("pageSize")) : 15;
		totalPages = pathParameters.get("totalPages") != null ? Integer.valueOf(pathParameters.getFirst("totalPages")) : 1;
		order = pathParameters.getFirst("direction") != null ? pathParameters.getFirst("direction") : "";
		orderBy = pathParameters.getFirst("orderBy") != null ? pathParameters.getFirst("orderBy") : "";
	}

	private Filter createFilterObject(MultivaluedMap<String, String> pathParameters) {
		Map<String, String> attrs = new HashMap<String, String>();
		for (String attrName : pathParameters.keySet()) {
			if (notPaginateAttr(attrName)) {
				attrs.put(attrName, pathParameters.getFirst(attrName));
			}
		}

		return Util.createObjectFrom(clazz, attrs);
	}

	private boolean notPaginateAttr(String attrName) {

		if (attrName.equals("page") || attrName.equals("pageSize") || attrName.equals("totalPages") || attrName.equals("direction") || attrName.equals("orderBy")) {
			return false;
		} else {
			return true;
		}
	}

	public PaginationParams(Class<Filter> clazz) {
		this.clazz = clazz;
	}

	public Integer getPage() {
		return page;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public Integer getFirstResults() {
		return (page - 1) * pageSize;
	}

	public String getOrderBy() {
		return orderBy;
	}

	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public void setPage(Integer page) {
		this.page = page <= 0 ? 0 : --page;
	}

	public Map<String, Object> getSearchParams() {
		if (searchParams == null) {
			setSearchParams(new HashMap<String, Object>());
		}
		return searchParams;
	}

	public void setSearchParams(Map<String, Object> searchParams) {
		this.searchParams = searchParams;
	}

	public Integer getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(Integer totalPages) {
		this.totalPages = totalPages;
	}

	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}

	public Filter getFilter() {
		return filter;
	}

	public void setFilter(Filter filterObject) {
		this.filter = filterObject;
	}
}