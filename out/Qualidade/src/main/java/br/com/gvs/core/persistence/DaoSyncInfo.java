package br.com.gvs.core.persistence;

import java.util.List;


import javax.inject.Named;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import br.com.gvs.core.model.SyncInfo;

/**
 * Deveremos nos preocupar no futuro com a geração de um SyncInfo para cada
 * Client
 **/

@Named
@SuppressWarnings("rawtypes")
public class DaoSyncInfo extends AccessibleHibernateDao<SyncInfo> {
	private static final Logger LOGGER = Logger.getLogger(DaoSyncInfo.class);

	public DaoSyncInfo() {
		super(SyncInfo.class);
	}

	public SyncInfo getLast(String clienteId) {
		Criteria criteria = criteria();

		criteria.add(Restrictions.eq("clienteId", clienteId));
		criteria.addOrder(Order.desc("lastSync"));
		criteria.setMaxResults(1);
		List list = criteria.list();
		if (list.size() > 0) {
			return (SyncInfo) list.get(0);
		}
		return null;
	}
}
