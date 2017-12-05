package br.com.c3pgen.base;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import br.com.c3pgen.base.methods.DataTypeMethod;
import br.com.c3pgen.base.methods.FirstLowerCaseMethod;
import br.com.c3pgen.base.methods.FirstUpperCaseMethod;
import br.com.c3pgen.base.methods.IsNumericMethod;
import br.com.c3pgen.base.methods.IsRequiredMethod;
import br.com.c3pgen.base.methods.MaxLenMethod;
import br.com.c3pgen.base.methods.OnlyFirstUpperCaseMethod;
import br.com.c3pgen.base.methods.SnakeCaseStringMethod;
import br.com.c3pgen.base.methods.ToKebabCaseMethod;
import br.com.c3pgen.base.methods.ToLowerCaseMethod;
import br.com.c3pgen.base.methods.ToStringMethod;
import br.com.c3pgen.base.methods.ToUpperCaseMethod;
import br.com.c3pgen.base.methods.getOwnerNameMethod;
import br.com.c3pgen.base.util.Util;
import br.com.c3pgen.model.Application;
import br.com.c3pgen.model.ApplicationEntity;
import freemarker.template.Template;
import freemarker.template.TemplateException;

public class MarkerGenerator {
    private static final Logger LOGGER = Logger.getLogger(MarkerGenerator.class);

    static {
        // init();
    }

    private FileType fileType;

    private String destinationFolder;

    private String templateName;

    private String templateFileName;

    private Application application;

    FreeMarkerConfig freeMarkerConfig;

    public MarkerGenerator(FreeMarkerConfig freeMarkerConfig, Application application, String template, String destinationFolder, String templateFileName, FileType fileType) {

        this.application = application;

        this.destinationFolder = destinationFolder;

        this.templateFileName = templateFileName;
        this.fileType = fileType;
        this.templateName = template;
        this.freeMarkerConfig = freeMarkerConfig;

    }

    private void tryCreateFolder(String string) {
        new File(string).mkdirs();
    }

    public Boolean generateEntityFile(Application application, ApplicationEntity entity) throws IOException, TemplateException {

        Template template = freeMarkerConfig.getTemplate(templateName);

        String folderName = destinationFolder.replace("${entity.name}", Util.firstLowerCase(entity.getName())).replace("$kc{entity.name}", Util.camelCaseToKebabCase(entity.getName()));
        String fileName = templateFileName.replace("${entity.name}", entity.getName()).replace("$kc{entity.name}", Util.camelCaseToKebabCase(entity.getName())) + "." + fileType.getSufix();

        tryCreateFolder(folderName);
        String finalName = folderName + File.separator + fileName;

        OutputStreamWriter fileWriter = new OutputStreamWriter(new FileOutputStream(finalName), Charset.forName("UTF-8"));

        // FileWriter fileWriter = new FileWriter(finalName);

        // PrintWriter fileWriter = new PrintWriter( fileName, "UTF-8" );

        try {
            template.process(adjustData(application, entity), fileWriter);
        } catch (Exception e) {
            LOGGER.error("Erro gerando entidade " + entity.getName() + " Arquivo: " + fileName, e);
        }

        fileWriter.close();
        LOGGER.info("Gerado o arquivo: [" + (finalName) + "]");
        return Boolean.TRUE;
    }

    private Object adjustData(Application application, ApplicationEntity object) {
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("firstLower", new FirstLowerCaseMethod());
        data.put("onlyFirstUpper", new OnlyFirstUpperCaseMethod());
        data.put("firstUpper", new FirstUpperCaseMethod());
        data.put("snakeCase", new SnakeCaseStringMethod());
        data.put("uppercase", new ToUpperCaseMethod());
        data.put("kebabCase", new ToKebabCaseMethod());
        data.put("lowercase", new ToLowerCaseMethod());
        data.put("isNumeric", new IsNumericMethod());
        data.put("getRequiredClass", new IsRequiredMethod());
        data.put("getMaxLen", new MaxLenMethod());
        data.put("dataType", new DataTypeMethod());
        data.put("package", application.getRootPackage());
        data.put("corepackage", application.getCorePackage());
        data.put("toListString", new ToStringMethod());
        data.put("entity", object);
        data.put("application", application);
        data.put("getOwnerName", new getOwnerNameMethod());
        data.put("dataBasePrefix", application.getDataBasePrefix());
        data.put("JSetupVersion", Util.JSETUP_VERSION);
        return data;
    }

    private Object adjustData(List<ApplicationEntity> object) {
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("firstLower", new FirstLowerCaseMethod());
        data.put("onlyFirstUpper", new OnlyFirstUpperCaseMethod());
        data.put("firstUpper", new FirstUpperCaseMethod());
        data.put("isNumeric", new IsNumericMethod());
        data.put("snakeCase", new SnakeCaseStringMethod());
        data.put("toListString", new ToStringMethod());
        data.put("getRequiredClass", new IsRequiredMethod());
        data.put("getMaxLen", new MaxLenMethod());
        data.put("uppercase", new ToUpperCaseMethod());
        data.put("lowercase", new ToLowerCaseMethod());

        data.put("kebabCase", new ToKebabCaseMethod());

        data.put("dataType", new DataTypeMethod());
        data.put("package", ApplicationConfiguration.MAIN_PACKAGE);
        data.put("entities", object);
        data.put("dataBasePrefix", application.getDataBasePrefix());
        data.put("getOwnerName", new getOwnerNameMethod());
        data.put("JSetupVersion", Util.JSETUP_VERSION);
        return data;
    }

    // TODO Melhorar mais um pouco
    private static Boolean init() {
        String base = Util.currentDir() + File.separator + "out" + File.separator + ApplicationConfiguration.MAIN_PACKAGE.replace(".", File.separator);
        String persistence = Util.currentDir() + File.separator + "out" + File.separator + ApplicationConfiguration.MAIN_PACKAGE.replace(".", File.separator) + File.separator + "persistence";
        String service = Util.currentDir() + File.separator + "out" + File.separator + ApplicationConfiguration.MAIN_PACKAGE.replace(".", File.separator) + File.separator + "service";
        String model = Util.currentDir() + File.separator + "out" + File.separator + ApplicationConfiguration.MAIN_PACKAGE.replace(".", File.separator) + File.separator + "model";
        String filter = Util.currentDir() + File.separator + "out" + File.separator + ApplicationConfiguration.MAIN_PACKAGE.replace(".", File.separator) + File.separator + "model" + File.separator + "filter";
        String json = Util.currentDir() + File.separator + "out" + File.separator + ApplicationConfiguration.MAIN_PACKAGE.replace(".", File.separator) + File.separator + "json";

        String rs = Util.currentDir() + File.separator + "out" + File.separator + ApplicationConfiguration.MAIN_PACKAGE.replace(".", File.separator) + File.separator + "rs";

        String utils = Util.currentDir() + File.separator + "out" + File.separator + ApplicationConfiguration.MAIN_PACKAGE.replace(".", File.separator) + File.separator + "utils";

        String baseJs = Util.currentDir() + File.separator + "out" + File.separator + "js" + File.separator;
        String baseJSViews = Util.currentDir() + File.separator + "out" + File.separator + "js" + File.separator + "views";
        String baseJSCollections = Util.currentDir() + File.separator + "out" + File.separator + "js" + File.separator + "collections";
        String baseJSModel = Util.currentDir() + File.separator + "out" + File.separator + "js" + File.separator + "models";
        String tpl = Util.currentDir() + File.separator + "out" + File.separator + "js" + File.separator + "tpl";

        LOGGER.info("Criando a estrutura de diretorios" + base);
        LOGGER.info("Criando a estrutura de diretorios" + persistence);
        LOGGER.info("Criando a estrutura de diretorios" + service);
        LOGGER.info("Criando a estrutura de diretorios" + model);
        LOGGER.info("Criando a estrutura de diretorios" + filter);
        LOGGER.info("Criando a estrutura de diretorios" + json);
        LOGGER.info("Criando a estrutura de diretorios" + rs);
        LOGGER.info("Criando a estrutura de diretorios" + baseJs);
        new File(persistence).mkdirs();
        new File(service).mkdirs();
        new File(model).mkdirs();
        new File(filter).mkdirs();
        new File(json).mkdirs();
        new File(rs).mkdirs();
        new File(utils).mkdirs();

        // ESTRUTURA DE PACOTES JAVASCRIPT
        new File(baseJs).mkdirs();
        new File(baseJSViews).mkdirs();
        new File(baseJSCollections).mkdirs();
        new File(baseJSModel).mkdirs();
        new File(tpl).mkdirs();
        return Boolean.TRUE;
    }

    public Boolean generate(Application aplication) throws IOException, TemplateException {
        Template template = freeMarkerConfig.getTemplate(templateName);
        tryCreateFolder(destinationFolder);

        OutputStreamWriter fileWriter = new OutputStreamWriter(new FileOutputStream(destinationFolder + templateFileName.replace("${entity.name}", "Fragment") + "." + fileType.getSufix()), Charset.forName("UTF-8"));
        // FileWriter fileWriter = new FileWriter(destinationFolder +
        // templateFileName.replace("${entity.name}", "Fragment") + "." +
        // fileType.getSufix());
        template.process(adjustData(aplication, null), fileWriter);
        fileWriter.close();
        return Boolean.FALSE;
    }

    public Boolean generateAppFragmentFile(List<ApplicationEntity> entities) throws IOException, TemplateException {
        Template template = freeMarkerConfig.getTemplate(templateName);
        tryCreateFolder(destinationFolder);
        FileWriter fileWriter = new FileWriter(destinationFolder + templateFileName.replace("${entity.name}", "Fragment") + "." + fileType.getSufix());
        template.process(adjustData(entities), fileWriter);
        fileWriter.close();
        return Boolean.FALSE;
    }

}
