package br.wpro.assessment.resource;

import br.wpro.assessment.model.entity.AssessmentPolicy;
import br.wpro.assessment.model.entity.CompetencePolicy;
import br.wpro.assessment.model.entity.CriteriaPolicy;
import br.wpro.assessment.service.AssessmentPolicyService;
import org.bson.types.ObjectId;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

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
    @Path("/{assessmentId}")
    public Response get(@PathParam String assessmentId) {
        return Response.ok(service.getById(new ObjectId(assessmentId))).build();
    }

    @PUT
    @Path("/{assessmentId}")
    public Response update(@PathParam String assessmentId, AssessmentPolicy policy) {
        policy.id = new ObjectId(assessmentId);
        return Response.ok(service.update(policy)).build();
    }

    @DELETE
    @Path("/{assessmentId}")
    public void delete(@PathParam String assessmentId) {
        service.delete(new ObjectId(assessmentId));
    }


    /**
     * CompetencyPolicy
     */
    @POST
    @Path("/{assessmentId}/competencePolicy")
    public Response addCompetence(@PathParam String assessmentId, CompetencePolicy policy) {
        return Response.ok(service.addCompetence(new ObjectId(assessmentId), policy)).build();
    }

    @PUT
    @Path("/{assessmentId}/competencePolicy/{competenceId}")
    public Response updateCompetence(@PathParam String assessmentId, @PathParam String competenceId, CompetencePolicy policy) {
        return Response.ok(service.updateCompetence(new ObjectId(assessmentId),competenceId, policy)).build();
    }

    @DELETE
    @Path("/{assessmentId}/competencePolicy/{competenceId}")
    public void removeCompetence(@PathParam String assessmentId, @PathParam String competenceId) {
        service.removeCompetence(new ObjectId(assessmentId), competenceId);
    }

    /**
     * CriteriaPolicy
     */
    @POST
    @Path("/{assessmentId}/competencePolicy/{competenceId}/criteriaPolicy")
    public Response addCompetenceCriteria(@PathParam String assessmentId, @PathParam String competenceId, CriteriaPolicy policy) {
        return Response.ok(service.addCompetenceCriteria(new ObjectId(assessmentId), competenceId, policy)).build();
    }

    @PUT
    @Path("/{assessmentId}/competencePolicy/{competenceId}/criteriaPolicy/{criteriaId}")
    public Response updateCompetenceCriterea(@PathParam String assessmentId, @PathParam String competenceId, @PathParam String criteriaId, CriteriaPolicy policy) {
        return Response.ok(service.updateCompetenceCriteria(new ObjectId(assessmentId),competenceId, criteriaId,  policy)).build();
    }

    @DELETE
    @Path("/{assessmentId}/competencePolicy/{competenceId}/criteriaPolicy/{criteriaId}")
    public void removeCompetenceCriterea(@PathParam String assessmentId, @PathParam String competenceId, @PathParam String criteriaId) {
        service.removeCompetenceCriterea(new ObjectId(assessmentId), competenceId, criteriaId);
    }

}