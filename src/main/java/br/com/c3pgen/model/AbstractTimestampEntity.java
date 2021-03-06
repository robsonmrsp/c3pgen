package br.com.c3pgen.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

import org.hibernate.annotations.Type;
import org.joda.time.LocalDateTime;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import br.com.c3pgen.serialization.CustomLocalDateTimeSerializer;

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

}