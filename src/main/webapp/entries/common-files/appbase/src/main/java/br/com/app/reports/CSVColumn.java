package ${application.corePackage}.reports;

/* generated by JSetup ${JSetupVersion} :  at ${.now} */
public interface CSVColumn<T> {

	String getHeader();

	Object getValue(T t);

}
