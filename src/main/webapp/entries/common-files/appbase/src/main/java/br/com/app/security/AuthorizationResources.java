package ${application.corePackage}.security;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import ${application.corePackage}.core.json.JsonError;
import ${application.rootPackage}.model.usuario.User;
import ${application.rootPackage}.security.AuthorizationService;

@Path("/auth")
public class AuthorizationResources {
	public static final Logger LOGGER = Logger.getLogger(AuthorizationResources.class);
	@Autowired
	AuthorizationService authorizationService;
	
	
	@GET
	@Path("all")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter() {
		Response response = null;

		return response;
	}

	@GET
	@Path("view")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response component(@QueryParam("type") String type, String identifier) {
		Response response = null;

		return response;
	}
}

