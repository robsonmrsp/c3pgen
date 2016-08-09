package ${application.corePackage}.rs;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.apache.log4j.Logger;

import ${application.corePackage}.json.JsonError;
import ${application.corePackage}.json.JsonPaginator;
import ${application.corePackage}.json.JsonUser;
import ${application.corePackage}.model.User;
import ${application.corePackage}.persistence.pagination.Pager;
import ${application.corePackage}.persistence.pagination.PaginationParams;
import ${application.corePackage}.service.UserService;
import ${application.corePackage}.service.UserService;
import ${application.corePackage}.utils.Parser;
/**
*  generated: 20/02/2014 00:54:51
**/

@Path("/crud/users")
public class UserResources {

	@Inject
	UserService userService;

	public static final Logger LOGGER = Logger.getLogger(UserResources.class);

	@GET
	@Path("all")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response all() {
		Response response = null;
		try {
			List<JsonUser> jsonUsers = Parser.toListJsonUsers(userService.all(userService.getLoggedUser().getOwner()));
			response = Response.ok(jsonUsers).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar todos os registros[%s]", e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(message, null)).build();
		}
		return response;
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response all(@Context UriInfo uriInfo) {
		Response response = null;
		Pager<User> users = null;

		try {
			MultivaluedMap<String, String> pathParameters = uriInfo.getQueryParameters();

			PaginationParams paginationParams = new PaginationParams(pathParameters);
			users = userService.all(paginationParams, userService.getLoggedUser().getOwner());
			JsonPaginator<JsonUser> paginator = new JsonPaginator<JsonUser>(Parser.toListJsonUsers(users.getItens()), users.getActualPage(), users.getTotalRecords());

			response = Response.ok(paginator).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar users para os parametros %s [%s]", uriInfo.getQueryParameters().toString(), e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(message, uriInfo.getQueryParameters().toString())).build();
		}
		return response;
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response save(JsonUser jsonUser) {
		try {

			User user = Parser.toEntity(jsonUser);
			user.setOwner(userService.getLoggedUser().getOwner());
			user = userService.save(user);
			return Response.ok().entity(Parser.toJson(user)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar  user [ %s ] parametros [ %s ]", e.getMessage(), jsonUser.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, jsonUser)).build();
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response get(@PathParam("id") Integer id) {
		try {

			User user = userService.get(id, userService.getLoggedUser().getOwner());

			return Response.ok().entity(Parser.toJson(user)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar o registro. [ %s ] parametros [ %d ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, id)).build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Long id, JsonUser jsonUser) {
		try {

			User user = Parser.toEntity(jsonUser);
			user.setOwner(userService.getLoggedUser().getOwner());
			user = userService.save(user);
			return Response.ok().entity(Parser.toJson(user)).build();

		} catch (Exception e) {
			String message = String.format("Não foi possivel salvar o registro [ %s ] parametros [ %s ]", e.getMessage(), jsonUser.toString());
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, jsonUser)).build();
		}
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			return Response.ok().entity(userService.delete(id)).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel remover o registro [ %s ] parametros [ %s ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, id)).build();
		}
	}
}
