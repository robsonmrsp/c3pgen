package br.com.c3pgen.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.envers.Audited;

@Entity
@Table(name = "APPLICATION_RELATIONSHIP")
@Audited
@SequenceGenerator(name = "APP_REL_SEQUENCE", sequenceName = "APP_REL_SEQUENCE")
public class ApplicationRelationship {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "APP_REL_SEQUENCE")
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "ID_APPLICATION")
	private Application application;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@ManyToOne
	@JoinColumn(name = "ID_ENTITY_SOURCE")
	public ApplicationEntity source;

//	@ManyToOne
//	@JoinColumn(name = "ID_RELATION_SOURCE")
//	public Relationship relationshipSource;
//
//	@ManyToOne
//	@JoinColumn(name = "ID_RELATION_TARGET")
//	public Relationship relationshipTarget;

	@ManyToOne
	@JoinColumn(name = "ID_ENTITY_TARGET")
	public ApplicationEntity targuet;

	public ApplicationEntity getSource() {
		return source;
	}

	public void setSource(ApplicationEntity source) {
		this.source = source;
	}

	public ApplicationEntity getTarguet() {
		return targuet;
	}

	public void setTarguet(ApplicationEntity targuet) {
		this.targuet = targuet;
	}

	public Application getApplication() {
		return application;
	}

	public void setApplication(Application application) {
		this.application = application;
	}

}
