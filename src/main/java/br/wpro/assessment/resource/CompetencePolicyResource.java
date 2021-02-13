package br.wpro.assessment.resource;

import br.wpro.assessment.model.entity.AssessmentPolicy;
import br.wpro.assessment.model.entity.CompetencePolicy;
import br.wpro.assessment.service.CompetencePolicyService;
import org.bson.types.ObjectId;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/api/v1/competencePolicy")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CompetencePolicyResource {

    @Inject
    CompetencePolicyService service;

    @GET
    public Response listAll() {
        return Response.ok(service.list()).build();
    }

    @POST
    public Response create(CompetencePolicy competencePolicy) {
        return Response.ok(service.save(competencePolicy)).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@PathParam String id, CompetencePolicy competencePolicy) {
        competencePolicy.id = new ObjectId(id);
        return Response.ok(service.update(competencePolicy)).build();
    }

    @GET
    @Path("/{id}")
    public Response save(@PathParam String id) {
        return Response.ok(service.getById(new ObjectId(id))).build();
    }

    @DELETE
    @Path("/{id}")
    public void delete(@PathParam String id) {
        service.delete(new ObjectId(id));
    }

}