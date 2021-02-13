package br.wpro.assessment.resource;

import br.wpro.assessment.model.entity.AssessmentPolicy;
import br.wpro.assessment.service.AssessmentPolicyService;
import org.bson.types.ObjectId;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@Path("/api/v1/assessmentPolicy")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AssessmentPolicyResource {

    @Inject
    AssessmentPolicyService service;

    @GET
    public Response listAll() {
        return Response.ok(service.list()).build();
    }

    @POST
    public Response create(AssessmentPolicy policy) {
        return Response.ok(service.save(policy)).build();
    }

    @GET
    @Path("/{id}")
    public Response get(@PathParam String id) {
        return Response.ok(service.getById(new ObjectId(id))).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@PathParam String id, AssessmentPolicy policy) {
        policy.id = new ObjectId(id);
        return Response.ok(service.update(policy)).build();
    }

    @DELETE
    @Path("/{id}")
    public void delete(@PathParam String id) {
        service.delete(new ObjectId(id));
    }


}