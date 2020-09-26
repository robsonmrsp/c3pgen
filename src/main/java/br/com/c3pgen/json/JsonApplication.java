package br.com.c3pgen.json;

import java.io.Serializable;
import java.util.ArrayList;

import javax.persistence.Column;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import br.com.c3pgen.model.ApplicationConfigurationType;
import br.com.c3pgen.model.ApplicationType;
import br.com.c3pgen.model.CriteriaType;
import br.com.c3pgen.serialization.CustomSyncObjectIdDeserializer;

/**
 * generated: 03/09/2015 14:51:47
 **/
@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonApplication implements Serializable {
    private static final long serialVersionUID = 1L;

    @JsonDeserialize(using = CustomSyncObjectIdDeserializer.class)
    private Integer id;
    private SyncOperation syncOperation;

    private String name;
    private String view;
    private String skin;
    private String description;
    private String rootPackage;
    private String corePackage;
    private Boolean useAudit;
	private Boolean useDocRestApi;
    private Boolean multitenancy;
    private Boolean generateTest;
    private Boolean asModule;
    private CriteriaType criteriaType;

    private ApplicationConfigurationType configurationType;
    private ApplicationType applicationType;

    private ArrayList<JsonTheEntity> entities = new ArrayList<JsonTheEntity>();

    private ArrayList<JsonApplicationRelationship> applicationRelationships = new ArrayList<JsonApplicationRelationship>();

    public JsonApplication() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSkin() {
        return skin;
    }

    public void setSkin(String skin) {
        this.skin = skin;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRootPackage() {
        return rootPackage;
    }

    public void setRootPackage(String rootPackage) {
        this.rootPackage = rootPackage;
    }

    public ArrayList<JsonTheEntity> getEntities() {
        return entities;
    }

    public void setEntities(ArrayList<JsonTheEntity> theEntity) {
        this.entities = theEntity;
    }

    public SyncOperation getSyncOperation() {
        if (syncOperation == null) {
            this.syncOperation = SyncOperation.NONE;
        }
        return syncOperation;
    }

    public void setSyncOperation(SyncOperation syncOperation) {
        this.syncOperation = syncOperation;
    }

    public ArrayList<JsonApplicationRelationship> getApplicationRelationships() {
        return applicationRelationships;
    }

    public void setApplicationRelationships(ArrayList<JsonApplicationRelationship> applicationRelationships) {
        this.applicationRelationships = applicationRelationships;
    }

    public String getCorePackage() {
        return corePackage;
    }

    public void setCorePackage(String corePackage) {
        this.corePackage = corePackage;
    }

    public Boolean getMultitenancy() {
        return multitenancy;
    }

    public void setMultitenancy(Boolean multitenancy) {
        this.multitenancy = multitenancy;
    }

    public Boolean getUseAudit() {
        return useAudit;
    }

    public void setUseAudit(Boolean useAudit) {
        this.useAudit = useAudit;
    }

    public ApplicationConfigurationType getConfigurationType() {
        return configurationType;
    }

    public void setConfigurationType(ApplicationConfigurationType configurationType) {
        this.configurationType = configurationType;
    }

    public ApplicationType getApplicationType() {
        return applicationType;
    }

    public void setApplicationType(ApplicationType applicationType) {
        this.applicationType = applicationType;
    }

    public Boolean getGenerateTest() {
        return generateTest;
    }

    public void setGenerateTest(Boolean generateTest) {
        this.generateTest = generateTest;
    }

    public Boolean getAsModule() {
        return asModule;
    }

    public void setAsModule(Boolean asModule) {
        this.asModule = asModule;
    }

    public CriteriaType getCriteriaType() {
        return criteriaType;
    }

    public void setCriteriaType(CriteriaType criteriaType) {
        this.criteriaType = criteriaType;
    }

    public String getView() {
        return view;
    }

    public void setView(String view) {
        this.view = view;
    }

	public Boolean getUseDocRestApi() {
		return useDocRestApi;
	}

	public void setUseDocRestApi(Boolean useDocRestApi) {
		this.useDocRestApi = useDocRestApi;
	}

}