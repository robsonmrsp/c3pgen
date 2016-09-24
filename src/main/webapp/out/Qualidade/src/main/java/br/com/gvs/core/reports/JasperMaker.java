package br.com.gvs.core.reports;

import java.util.List;

import java.util.Map;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

public class JasperMaker {

	public String makePdfFile(String jasperFile, String fileName, Map<String, Object> parametros, List<?> beans) {

		JRDataSource jrds = new JRBeanCollectionDataSource(beans);
		try {

			JasperPrint print = JasperFillManager.fillReport(jasperFile, parametros, jrds);
			JasperExportManager.exportReportToPdfFile(print, fileName);

			return fileName;
		} catch (Exception e) {
			throw new RuntimeException(e.getCause().toString(), e);
		}
	}
}