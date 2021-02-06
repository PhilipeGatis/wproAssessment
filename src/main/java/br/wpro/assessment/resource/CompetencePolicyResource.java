package br.wpro.assessment.resource;

import br.wpro.assessment.model.entity.AssessmentPolicy;
import br.wpro.assessment.model.entity.CompetencePolicy;
import br.wpro.assessment.service.CompetencePolicyService;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/api/v1/competencePolicy")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CompetencePolicyResource {

    @Inject
    CompetencePolicyService service;

    @GET
    @Path("/hello")
    public String hello() {
        return "Hello CompetencePolicy";
    }

    @GET
    public List<CompetencePolicy> listAll() {
        return service.list();
    }

    @GET
    @Path("/{id}")
    public CompetencePolicy get(@PathParam long id) {
        return service.getById(id);
    }

    @POST
    @Path("/create")
    public CompetencePolicy create(@PathParam String name){
        CompetencePolicy policy = CompetencePolicy.builder().name(name).build();
        return service.save(policy);
    }

    @PUT
    public CompetencePolicy save(CompetencePolicy policy) {
        return service.save(policy);
    }

}