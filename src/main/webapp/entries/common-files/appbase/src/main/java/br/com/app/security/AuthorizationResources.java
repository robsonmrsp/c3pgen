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

import java.util.List;
import javax.inject.Inject;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import ${application.corePackage}.json.JsonError;import ${application.corePackage}.utils.Parser;import ${application.rootPackage}.model.Permission;

import ${application.rootPackage}.model.User;import ${application.corePackage}.security.AuthorizationService;

@Path("/auth")
public class AuthorizationResources {
	public static final Logger LOGGER = Logger.getLogger(AuthorizationResources.class);
	@Inject
	AuthorizationService authorizationService;

	@GET
	@Path("all")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response filter() {
		Response response = null;
		try {
			List<Permission> permissoes = authorizationService.getAllPermissions();

			response = Response.ok(Parser.toListJsonPermissions(permissoes)).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel checar os direitos de acesso[%s]", e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(e, message)).build();
		}
		return response;
	}

	@GET
	@Path("view")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response component(@QueryParam("type") String type, @QueryParam("identifier") String identifier) {
		Response response = null;
		try {

			Boolean retorno = authorizationService.authorizedAccess(type, identifier);

			response = Response.ok(retorno).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel checar os direitos de acesso[%s]", e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(e, message)).build();
		}

		return response;
	}
}
