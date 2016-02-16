package ${application.rootPackage}.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Type;
import org.hibernate.envers.Audited;
import org.joda.time.LocalDateTime;

import ${application.rootPackage}.serialization.CustomLocalDateTimeSerializer;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@Audited
@Table(name = "SYNC_INFO")
@SequenceGenerator(name = "SYNC_INFO_SEQUENCE", sequenceName = "SYNC_INFO_SEQUENCE")
public class SyncInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SYNC_INFO_SEQUENCE")
	private Integer id;

	@Column(name = "MOBILE_CLIENT_ID")
	private String clienteId;

	@Column(name = "LAST_SYNC")
	@Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDateTime")
	@JsonSerialize(using = CustomLocalDateTimeSerializer.class)
	private LocalDateTime lastSync;

	public String getClienteId() {
		return clienteId;
	}

	public void setClienteId(String clienteId) {
		this.clienteId = clienteId;
	}

	public LocalDateTime getLastSync() {
		return lastSync;
	}

	public void setLastSync(LocalDateTime lastSync) {
		this.lastSync = lastSync;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
}
