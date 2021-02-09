package br.wpro.assessment.resource;

import br.wpro.assessment.model.entity.AreaSector;
import br.wpro.assessment.model.entity.JobRole;
import br.wpro.assessment.service.AreaSectorService;
import br.wpro.assessment.service.JobRoleService;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/api/v1/areaSector")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AreaSectorResource {

    @Inject
    AreaSectorService service;

    @GET
    @Path("/hello")
    public String hello() {
        return "Hello AreaSector";
    }

    @GET
    public List<AreaSector> list() {
        return service.list();
    }

    @GET
    @Path("/{name}")
    public AreaSector getByName(@PathParam String name) {
        return service.getByName(name);
    }

    @GET
    @Path("/{id}")
    public AreaSector getById(@PathParam String id) {
        return service.getById(id);
    }

    @PUT
    public AreaSector save(AreaSector areaSector) {
        return service.save(areaSector);
    }

    @POST
    @Path("/create")
    public AreaSector create(AreaSector areaSector) {
        return service.save(areaSector);
    }

    @DELETE
    @Path("/{id}")
    public void delete(@PathParam String id) {
        service.delete(id);
    }
}