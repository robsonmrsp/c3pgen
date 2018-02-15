package ${application.corePackage}.json;

import java.util.List;

public class JsonPaginator<JsonEntity> {
    private final List<JsonEntity> items;
    private final Integer actualPage;
    private final Long totalRecords;

    public JsonPaginator(List<JsonEntity> items, Integer actualPage, Long totalRecords) {
        super();
        this.items = items;
        this.actualPage = actualPage;
        this.totalRecords = totalRecords;
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
}
