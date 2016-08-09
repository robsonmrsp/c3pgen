package ${application.rootPackage}.persistence;

import javax.inject.Named;


import org.apache.log4j.Logger;
import org.hibernate.criterion.Restrictions;

import ${application.corePackage}.model.User;

/**
 * generated: 19/02/2014 19:18:06
 **/

@Named
public class DaoUser extends AccessibleHibernateDao<User> {
	private static final Logger LOGGER = Logger.getLogger(DaoUser.class);

	public DaoUser() {
		super(User.class);
	}

	public User findByUserName(String username) {
		User user = null;
		try {
			user = (User) criteria().add(Restrictions.eq("username", username)).list().get(0);
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error("Erro ao obter usuário pelo username," + username, e);
		}
		return user;
	}
}
