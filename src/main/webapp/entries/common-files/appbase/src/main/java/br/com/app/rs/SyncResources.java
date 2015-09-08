package ${application.rootPackage}.rs;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;

import ${application.rootPackage}.json.JsonError;
import ${application.rootPackage}.service.SyncService;
import ${application.rootPackage}.json.DtoDataBase;
@Path("/comunication")
public class SyncResources {

	public static final Logger LOGGER = Logger.getLogger(SyncResources.class);
	@Inject
	SyncService syncService;

	@GET
	@Path("ping")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response ping() {
		Response response = null;
		try {
			response = Response.ok(Boolean.TRUE).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar todos os registros[%s]", e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(message, null)).build();
		}
		return response;
	}

	@POST
	@Path("sync")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response sync(DtoDataBase dataBase) {
		Response response = null;
		try {
			response = Response.ok(syncService.sync(dataBase)).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel carregar todos os registros[%s]", e.getMessage());
			LOGGER.error(message, e);
			response = Response.serverError().entity(new JsonError(message, null)).build();
		}
		return response;
	}

}
