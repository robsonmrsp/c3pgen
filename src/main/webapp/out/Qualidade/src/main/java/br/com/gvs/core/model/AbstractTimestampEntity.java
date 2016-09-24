package br.com.gvs.core.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import org.hibernate.annotations.Type;
import org.joda.time.LocalDateTime;

import br.com.gvs.core.serialization.CustomLocalDateTimeSerializer;
import br.com.gvs.qualidade.model.User;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
@MappedSuperclass
public abstract class AbstractTimestampEntity implements Serializable {

	private static final long serialVersionUID = -7964355524118760783L;
	@Column(name = "CREATE_DATETIME")
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDateTime")
	@JsonSerialize(using = CustomLocalDateTimeSerializer.class)
	private LocalDateTime createDatetime;

	@Column(name = "LAST_UPDATE_DATETIME")
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDateTime")
	@JsonSerialize(using = CustomLocalDateTimeSerializer.class)
	private LocalDateTime lastUpdateDatetime;

	@Column(name="USER_CREATE")
	private String userCreate;

	@Column(name="USER_CHANGE")
	private String userChange;

	public LocalDateTime getCreateDatetime() {
		return createDatetime;
	}

	public void setCreateDatetime(LocalDateTime createDatetime) {
		this.createDatetime = createDatetime;
	}

	public LocalDateTime getLastUpdateDatetime() {
		return lastUpdateDatetime;
	}

	public void setLastUpdateDatetime(LocalDateTime lastUpdateDatetime) {
		this.lastUpdateDatetime = lastUpdateDatetime;
	}

	public String getUserCreate() {
		return userCreate;
	}

	public void setUserCreate(String userCreate) {
		this.userCreate = userCreate;
	}

	public String getUserChange() {
		return userChange;
	}

	public void setUserChange(String userChange) {
		this.userChange = userChange;
	}

}