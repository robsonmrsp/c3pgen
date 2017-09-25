package br.com.c3pgen.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.envers.Audited;

/**
 * generated: 03/09/2015 14:51:47
 **/
@Entity
@Audited
@SequenceGenerator(name = "APPLICATION_SEQUENCE", sequenceName = "APPLICATION_SEQUENCE")
public class Application extends AbstractTimestampEntity {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "APPLICATION_SEQUENCE")
	private Integer id;

	@Column(name = "NAME")
	private String appName;

	@Column(name = "SKIN")
	private String skin;

	@Column(name = "DESCRIPTION")
	private String description;

	@Column(name = "ROOT_PACKAGE")
	private String rootPackage;

	@Column(name = "CORE_PACKAGE")
	private String corePackage;

	@Column(name = "BOOTSTRAP_VERSION")
	private String bootstrapVersion = "3";

	@Column(name = "PERSISTENCE_FRAMEWORK")
	private String persistenceFramework = "hibernate";

	@Column(name = "VIEW")
	private String view;

	@Column(name = "USE_AUDIT")
	private Boolean useAudit;
	
	@Column(name = "USE_DOC_REST_API")
	private Boolean useDocRestApi;

	@Column(name = "DATA_BASE_PREFIX")
	private String dataBasePrefix;

	@OneToMany(mappedBy = "application")
//	@Cascade(CascadeType.ALL)
	private List<ApplicationEntity> entities;

	@OneToMany(mappedBy = "application")
//	@Cascade(CascadeType.ALL)
	private Set<ApplicationRelationship> applicationRelationships;

	@ManyToOne
	@JoinColumn(name = "id_client")
	private Client owner;

	public Client getOwner() {
		return owner;
	}

	public void setOwner(Client owner) {
		this.owner = owner;
	}

	public Application() {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public void setEntities(List<ApplicationEntity> entities) {
		this.entities = entities;
	}

	public List<ApplicationEntity> getEntities() {
		if (this.entities == null) {
			setEntities(new ArrayList<ApplicationEntity>());
		}
		return this.entities;
	}

	public boolean addEntities(ApplicationEntity theEntity) {
		theEntity.setApplication(this);
		return getEntities().add(theEntity);
	}

	public boolean addAllApplicationRelationships(Set<ApplicationRelationship> applicationRelationships) {
		for (ApplicationRelationship applicationRelationship : applicationRelationships) {
			this.addApplicationRelationships(applicationRelationship);
		}
		return true;
	}

	public boolean addApplicationRelationships(ApplicationRelationship applicationRelationship) {
		applicationRelationship.setApplication(this);

		return getApplicationRelationships().add(applicationRelationship);
	}

	public boolean removeEntities(ApplicationEntity theEntity) {
		theEntity.setApplication(null);
		return getEntities().remove(theEntity);
	}

	public String getView() {
		if (view == null) {
			setView("Backbone");
		}
		return view;
	}

	public void setView(String view) {
		this.view = view;
	}

	public Boolean hasMobApp() {
		if (entities != null) {
			for (ApplicationEntity e : entities) {
				if (e.getHasMobile()) {
					return Boolean.TRUE;
				}
			}
		}
		return Boolean.FALSE;
	}

	public Boolean hasAudit() {
		if (useAudit == null) {
			return Boolean.FALSE;
		}
		return useAudit;
	}
	
	public Boolean hasDocRestApi() {
		if (useDocRestApi == null) {
			return Boolean.FALSE;
		}
		return useDocRestApi;
	}

	public Boolean hasClient() {
		if (entities != null) {
			for (ApplicationEntity e : entities) {
				if (e.getHasOwner()) {
					return Boolean.TRUE;
				}
			}
		}
		return Boolean.FALSE;
	}

	public String getDataBasePrefix() {

		return dataBasePrefix;
	}

	public void setDataBasePrefix(String dataBasePrefix) {
		this.dataBasePrefix = dataBasePrefix;
	}

	public String getAppName() {
		return appName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	public Set<ApplicationRelationship> getApplicationRelationships() {
		if (applicationRelationships == null) {
			setApplicationRelationships(new HashSet<ApplicationRelationship>());
		}
		return applicationRelationships;
	}

	public void setApplicationRelationships(Set<ApplicationRelationship> applicationRelationships) {
		this.applicationRelationships = applicationRelationships;
	}

	public String getCorePackage() {
		if (corePackage == null) {
			setCorePackage(getRootPackage());
		}
		return corePackage;
	}

	public void setCorePackage(String corePackage) {
		this.corePackage = corePackage;
	}

	public String getBootstrapVersion() {
		if (bootstrapVersion == null) {
			setBootstrapVersion("3");
		}
		return bootstrapVersion;
	}

	public void setBootstrapVersion(String bootstrapVersion) {
		this.bootstrapVersion = bootstrapVersion;
	}

	public String getPersistenceFramework() {
		if (persistenceFramework == null) {
			setPersistenceFramework("hibernate");
		}
		return persistenceFramework;
	}

	public void setPersistenceFramework(String persistenceFramework) {
		this.persistenceFramework = persistenceFramework;
	}

	public Boolean getUseAudit() {
		return useAudit;
	}

	public void setUseAudit(Boolean useAudit) {
		this.useAudit = useAudit;
	}

}
