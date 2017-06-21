package ${application.corePackage}.reports;

import java.util.LinkedList;

public abstract class CSVLayout<T> {

	private LinkedList<CSVColumn<T>> columns = new LinkedList<CSVColumn<T>>();

	public void addColumn(CSVColumn<T> csvColumn) {
		getColumns().add(csvColumn);
	}

	public LinkedList<CSVColumn<T>> getColumns() {
		return columns;
	}

	public void setColumns(LinkedList<CSVColumn<T>> columns) {
		this.columns = columns;
	}
	
	public abstract void adicionarColunas();
}
