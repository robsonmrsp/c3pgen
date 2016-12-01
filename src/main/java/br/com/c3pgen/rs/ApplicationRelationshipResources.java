package br.com.c3pgen.rs;

import javax.inject.Inject;
import javax.ws.rs.DELETE;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;

import br.com.c3pgen.json.JsonError;
import br.com.c3pgen.rs.exception.ValidationException;
import br.com.c3pgen.security.SpringSecurityUserContext;
import br.com.c3pgen.service.ApplicationRelationshipService;

/**
 * generated: 03/09/2015 14:51:48
 **/

@Path("/crud/applicationRelationships")
public class ApplicationRelationshipResources {

	@Inject
	ApplicationRelationshipService applicationRelationshipService;

	@Inject
	private SpringSecurityUserContext context;

	public static final Logger LOGGER = Logger.getLogger(ApplicationRelationshipResources.class);

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		try {
			Boolean delete = applicationRelationshipService.delete(id);
			return Response.ok().entity(delete).build();
		} catch (ValidationException e) {
			String message = String.format("Não foi possivel remover  o registro [ %s ] parametros [ %s ]", e.getOrigem().getMessage(), id);
			LOGGER.error(message, e.getOrigem());
			return Response.serverError().entity(new JsonError(message, id, e.getLegalMessage())).build();
		} catch (Exception e) {
			String message = String.format("Não foi possivel remover o registro [ %s ] parametros [ %s ]", e.getMessage(), id);
			LOGGER.error(message, e);
			return Response.serverError().entity(new JsonError(message, id)).build();
		}
	}
}
