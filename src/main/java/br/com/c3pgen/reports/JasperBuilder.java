package br.com.c3pgen.reports;

import java.io.ByteArrayOutputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporter;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.export.JRPdfExporter;

public class JasperBuilder {

	private final DataSource datasource;

	private static final Logger logger = LoggerFactory.getLogger(JasperMaker.class);

	public JasperBuilder(DataSource datasource) {
		this.datasource = datasource;
	}

	public byte[] build(String jrxmlFile, Map<String, Object> parameters) {
		try {
			JasperPrint print = compileAndFillReport(jrxmlFile, parameters);
			byte[] content = exportToPdf(print);
			return content;
		} catch (Exception e) {
			logger.error("PDF Exporter error", e);
			throw new RuntimeException(e.getMessage(), e);
		}
	}

	private byte[] exportToPdf(JasperPrint print) throws JRException {
		JRExporter exporter = new JRPdfExporter();

		ByteArrayOutputStream exported = new ByteArrayOutputStream();

		exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, exported);
		exporter.setParameter(JRExporterParameter.JASPER_PRINT, print);

		exporter.exportReport();

		return exported.toByteArray();
	}

	/**
	 * Compila o .jrxml (gera o .jasper) e por fim preenche o relatório.
	 */
	private JasperPrint compileAndFillReport(String jrxmlFile, Map<String, Object> parametros) throws JRException {
		JasperReport report = JasperCompileManager.compileReport(jrxmlFile);
		JasperPrint print = JasperFillManager.fillReport(report, parametros, getConnection());
		return print;
	}

	private Connection getConnection() {
		try {
			return datasource.getConnection();
		} catch (SQLException e) {
			logger.error("Impossivel obter uma conexão com o banco de dados", e);
			throw new IllegalStateException("Impossivel obter uma conexão com o banco de dados.");
		}
	}

}