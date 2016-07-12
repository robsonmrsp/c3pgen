package br.com.c3pgen.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
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
	@JoinColumn(name = "ID_SOURCE")
	@Cascade(CascadeType.ALL)
	private Relationship source;

	@ManyToOne
	@Cascade(CascadeType.ALL)
	@JoinColumn(name = "ID_TARGET")
	private Relationship target;

	public Application getApplication() {
		return application;
	}

	public void setApplication(Application application) {
		this.application = application;
	}

	public Relationship getSource() {
		return source;
	}

	public void setSource(Relationship source) {
		this.source = source;
	}

	public Relationship getTarget() {
		return target;
	}

	public void setTarget(Relationship target) {
		this.target = target;
	}

}
