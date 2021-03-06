package br.com.c3pgen.persistence.pagination;

import java.util.List;

public class Pagination<T> {

	private final Long totalRecords;
	private final List<T> results;

	public Pagination(Long totalRecords, List<T> results) {
		this.totalRecords = totalRecords;
		this.results = results;
	}

	public List<T> getResults() {
		return results;
	}

	public Long getTotalRecords() {
		return totalRecords;
	}
}