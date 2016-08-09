package ${application.rootPackage}.persistence;

import javax.annotation.PostConstruct;

import org.hibernate.SessionFactory;
import org.hibernate.event.service.spi.EventListenerRegistry;
import org.hibernate.event.spi.EventType;
import org.hibernate.event.spi.PreInsertEvent;
import org.hibernate.event.spi.PreInsertEventListener;
import org.hibernate.event.spi.PreUpdateEvent;
import org.hibernate.event.spi.PreUpdateEventListener;
import org.hibernate.internal.SessionFactoryImpl;
import org.joda.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ${application.corePackage}.model.AbstractTimestampEntity;

@Component
public class HibernateEventWiring {

	@Autowired
	private SessionFactory sessionFactory;

	private CustomUpdateInsertListener listener = new CustomUpdateInsertListener();

	@PostConstruct
	public void registerListeners() {
		EventListenerRegistry registry = ((SessionFactoryImpl) sessionFactory).getServiceRegistry().getService(EventListenerRegistry.class);
		registry.getEventListenerGroup(EventType.PRE_INSERT).appendListener(listener);
		registry.getEventListenerGroup(EventType.PRE_UPDATE).appendListener(listener);
	}

	class CustomUpdateInsertListener implements PreInsertEventListener, PreUpdateEventListener {
		private static final long serialVersionUID = 2099325433851166122L;

		@Override
		public boolean onPreUpdate(PreUpdateEvent event) {
			Object entity = event.getEntity();
			if (entity instanceof AbstractTimestampEntity) {
				AbstractTimestampEntity abs = (AbstractTimestampEntity) entity;
				abs.setLastUpdateDatetime(LocalDateTime.now());
			}
			return false;
		}

		@Override
		public boolean onPreInsert(PreInsertEvent event) {
			Object entity = event.getEntity();
			if (entity instanceof AbstractTimestampEntity) {
				AbstractTimestampEntity abs = (AbstractTimestampEntity) entity;
				abs.setLastUpdateDatetime(LocalDateTime.now());
				abs.setCreateDatetime(LocalDateTime.now());
			}
			return false;
		}
	}
}