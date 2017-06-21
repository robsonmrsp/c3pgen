package ${application.corePackage}.reports;

public interface CSVColumn<T> {

	String getHeader();

	Object getValue(T t);

}
