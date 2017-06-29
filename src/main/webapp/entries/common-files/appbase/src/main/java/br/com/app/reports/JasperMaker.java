package ${application.corePackage}.reports;

import java.util.List;

import java.util.List;
import java.util.Map;


import org.apache.log4j.Logger;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

public class JasperMaker {
	public static final Logger LOGGER = Logger.getLogger(JasperMaker.class);

	public static String makePdfFile(String jrxmlFile, String fileName, Map<String, Object> parametros, List<?> beans) throws Exception {

		JRDataSource jrds = new JRBeanCollectionDataSource(beans);
		JasperReport report = JasperCompileManager.compileReport(jrxmlFile);
		JasperPrint print = JasperFillManager.fillReport(report, parametros, jrds);

		JasperExportManager.exportReportToPdfFile(print, fileName);

		return fileName;
	}
}