package ${application.corePackage}.persistence.pagination;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;

import ${application.corePackage}.utils.Util;

/* generated by JSetup ${JSetupVersion} :  at ${.now} */
public class SearchParameters<Filter> {

	private Integer page;
	private Integer pageSize;
	private Integer totalPages;
	private String orderBy;
	private String order;
	
	private Boolean exact;
	private Filter filter;

	private Map<String, Object> searchParams;

	private Class<Filter> claz;

	public SearchParameters(MultiValueMap<String, String> pathParameters, Class<Filter> claz) {
		this.claz = claz;
		setPaginationValues(pathParameters);
		if (claz != null)
			setFilter(createFilterObject(pathParameters));
	}

	private void setPaginationValues(MultiValueMap<String, String> pathParameters) {
		exact = pathParameters.get("exact") != null ? Boolean.valueOf(pathParameters.getFirst("exact")) : Boolean.FALSE;
		page = pathParameters.get("page") != null ? Integer.valueOf(pathParameters.getFirst("page")) : 1;
		pageSize = pathParameters.get("pageSize") != null ? Integer.valueOf(pathParameters.getFirst("pageSize")) : 50;
		totalPages = pathParameters.get("totalPages") != null ? Integer.valueOf(pathParameters.getFirst("totalPages")) : 1;
		order = pathParameters.getFirst("direction") != null ? pathParameters.getFirst("direction") : "";
		orderBy = pathParameters.getFirst("orderBy") != null ? pathParameters.getFirst("orderBy") : "";
	}

	private Filter createFilterObject(MultiValueMap<String, String> pathParameters) {
		Map<String, String> attrs = new HashMap<String, String>();
		for (String attrName : pathParameters.keySet()) {
			if (notPaginateAttr(attrName)) {
				attrs.put(attrName, pathParameters.getFirst(attrName));
			}
		}

		return Util.createObjectFrom(claz, attrs);
	}

	private boolean notPaginateAttr(String attrName) {

		if (attrName.equals("page") || attrName.equals("pageSize") || attrName.equals("totalPages") || attrName.equals("direction") || attrName.equals("orderBy")) {
			return false;
		} else {
			return true;
		}
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

	public Pageable getPageRequest() {
		if (StringUtils.isEmpty(getOrder()) || StringUtils.isEmpty(getOrderBy())) {
			return PageRequest.of(getPage() - 1, getPageSize());
		} else {
			return PageRequest.of(getPage() - 1, getPageSize(), Sort.by(Direction.valueOf(getOrder().toUpperCase()), getOrderBy()));
		}
	}

	public Boolean isExact() {
		return exact;
	}

	public void setExact(Boolean exact) {
		this.exact = exact;
	}
}