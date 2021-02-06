package br.wpro.assessment.resource;

import br.wpro.assessment.model.entity.AssessmentPolicy;
import br.wpro.assessment.service.AssessmentPolicyService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

@Path("/api/v1/assessmentPolicy")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AssessmentPolicyResource {

    @Inject
    AssessmentPolicyService assessmentPolicyService;

    @GET
    @Path("/hello")
    public String hello() {
        return "Hello AssessmentPolicies";
    }

    @GET
    public List<AssessmentPolicy> listAll() {
        return assessmentPolicyService.list();
    }

    @GET
    @Path("/{id}")
    public AssessmentPolicy get(@PathParam long id) {
        return assessmentPolicyService.getById(id);
    }

    @POST
    @Path("/create")
    public AssessmentPolicy create(@PathParam String name){
        AssessmentPolicy policy = AssessmentPolicy.builder().name(name).build();
        return assessmentPolicyService.save(policy);
    }

    @PUT
    public AssessmentPolicy save(AssessmentPolicy policy){
        return assessmentPolicyService.save(policy);
    }

}