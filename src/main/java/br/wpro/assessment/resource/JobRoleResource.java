package br.wpro.assessment.resource;

import br.wpro.assessment.model.entity.JobRole;
import br.wpro.assessment.service.JobRoleService;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/api/v1/jobRole")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class JobRoleResource {

    @Inject
    JobRoleService service;

    @GET
    @Path("/hello")
    public String hello() {
        return "Hello JobRole";
    }

    @GET
    public List<JobRole> list() {
        return service.list();
    }

    @GET
    @Path("/{name}")
    public JobRole getByName(@PathParam String name) {
        return service.getByName(name);
    }

    @GET
    @Path("/{id}")
    public JobRole getById(@PathParam String id) {
        return service.getById(id);
    }

    @PUT
    public JobRole save(JobRole jobRole) {
        return service.save(jobRole);
    }

    @POST
    @Path("/create")
    public JobRole create(JobRole role) {
        return service.save(role);
    }

    @DELETE
    @Path("/{id}")
    public void delete(@PathParam String id) {
        service.delete(id);
    }

}