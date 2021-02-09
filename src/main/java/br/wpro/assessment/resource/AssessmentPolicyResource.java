package br.wpro.assessment.resource;

import br.wpro.assessment.model.entity.AssessmentPolicy;
import br.wpro.assessment.service.AssessmentPolicyService;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@Path("/api/v1/assessmentPolicy")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AssessmentPolicyResource {

    @Inject
    AssessmentPolicyService service;

    @GET
    @Path("/hello")
    public String hello() {
        return "Hello AssessmentPolicies";
    }

    @GET
    public List<AssessmentPolicy> listAll() {
        return service.list();
    }

    @GET
    @Path("/{id}")
    public AssessmentPolicy get(@PathParam String id) {
        return service.getById(id);
    }

    @POST
    @Path("/create")
    public AssessmentPolicy create(AssessmentPolicy policy) {
        return service.save(policy);
    }

    @PUT
    public AssessmentPolicy save(AssessmentPolicy policy) {
        return service.save(policy);
    }

    @DELETE
    @Path("/{id}")
    public void delete(@PathParam String id) {
        service.delete(id);
    }


}