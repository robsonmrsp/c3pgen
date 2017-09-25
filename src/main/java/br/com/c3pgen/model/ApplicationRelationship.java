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
	// @Cascade(CascadeType.ALL)
	private Relationship source;

	@ManyToOne
	// @Cascade(CascadeType.ALL)
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;

		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ApplicationRelationship other = (ApplicationRelationship) obj;

		if (other.getSource() != null && other.getSource().equals(getSource()) && other.getTarget() != null && other.getTarget().equals(getTarget())) {
			return true;
		}
		if (other.getSource() != null && other.getSource().equals(getTarget()) && other.getTarget() != null && other.getTarget().equals(getSource())) {
			return true;
		}

		return false;
	}

	@Override
	public String toString() {
		return "[ " + getSource().getName() + ", " + getSource().getModel() + ", " + getSource().getOwnerName() + "; " + getTarget().getName() + ", " + getTarget().getModel() + ",  " + getTarget().getOwnerName() + " ]";
	}
}
