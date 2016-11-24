package br.com.c3pgen.audit;

import org.hibernate.envers.RevisionListener;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import br.com.c3pgen.model.CustomRevisionEntity;

public class CustomEnversListener implements RevisionListener {
	@Override
	public void newRevision(Object revisionEntity) {

		CustomRevisionEntity customRevisionEntity = (CustomRevisionEntity) revisionEntity;
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			customRevisionEntity.setUsername(authentication.getName());
		} catch (Exception e) {
			System.err.println(e.getMessage());
			customRevisionEntity.setUsername("async_task");
		}
	}
}
