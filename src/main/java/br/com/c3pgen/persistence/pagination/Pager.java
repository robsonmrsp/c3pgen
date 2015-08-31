package br.com.c3pgen.persistence.pagination;

import java.util.List;

public class Pager<Entity> {
	private final List<Entity> itens;
	private final Integer actualPage;
	private final Long totalRecords;

	public Pager(List<Entity> itens, Integer actualPage, Long totalRecords) {
		super();
		this.itens = itens;
		this.actualPage = actualPage;
		this.totalRecords = totalRecords;
	}

	public List<Entity> getItens() {
		return itens;
	}

	public Integer getActualPage() {
		return actualPage;
	}

	public Long getTotalRecords() {
		return totalRecords;
	}

}
