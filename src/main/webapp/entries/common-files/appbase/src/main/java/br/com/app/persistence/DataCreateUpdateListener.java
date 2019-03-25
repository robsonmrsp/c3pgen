package ${application.corePackage}.persistence;

import java.time.LocalDateTime;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.netflics.core.model.AbstractEntity;
import br.com.netflics.core.security.SpringSecurityUserContext;
import ${application.corePackage}.model.AbstractEntity;

@Component
public class DataCreateUpdateListener {

	@Autowired
	private SpringSecurityUserContext context;

	@PreUpdate
	private void preUpdate(AbstractEntity entity) {
		entity.setTenant(context.getTenant());
		entity.setLastUpdateDatetime(LocalDateTime.now());
		entity.setUserChange(context.getCurrentUserName());
	}

	@PrePersist
	private void preInsert(AbstractEntity entity) {
		entity.setTenant(context.getTenant());
		entity.setCreateDatetime(LocalDateTime.now());
		entity.setUserCreate(context.getCurrentUserName());
	}
}