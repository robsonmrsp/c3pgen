package ${application.corePackage}.json;

import java.util.List;

public class JsonPaginator<JsonEntity> {
	private final List<JsonEntity> items;
	private final Integer actualPage;
	private final Long totalRecords;

	private final Integer pageSize;
	private final String orderBy;
	private final String order;

	private JsonPaginator(List<JsonEntity> items, Integer actualPage, Integer pageSize, String orderBy, String order, Long totalRecords) {
		super();
		this.items = items;
		this.actualPage = actualPage;
		this.pageSize = pageSize;
		this.order = order;
		this.orderBy = orderBy;
		this.totalRecords = totalRecords;
	}

	public static <JsonEntity> JsonPaginator of(List<JsonEntity> items, Integer actualPage, Integer pageSize, String orderBy, String order, Long totalRecords) {
		return new JsonPaginator<>(items, actualPage, pageSize, orderBy, order, totalRecords);
	}

	public List<JsonEntity> getItems() {
		return items;
	}

	public Integer getActualPage() {
		return actualPage;
	}

	public Long getTotalRecords() {
		return totalRecords;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public String getOrderBy() {
		return orderBy;
	}

	public String getOrder() {
		return order;
	}
}
