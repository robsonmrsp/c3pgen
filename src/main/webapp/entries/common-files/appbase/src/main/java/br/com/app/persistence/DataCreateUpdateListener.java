package com.jsetup.firstboot;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import ${application.corePackage}.Tenant;

public class DataCreateUpdateListener {

	@PrePersist
	@PreUpdate
	private void beforeAnyOperation(AbstractEntity entity) {

		System.out.println("AuditListener.beforeAnyOperation()" + entity.getTenant());
	}
}