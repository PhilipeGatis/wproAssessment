package br.wpro.assessment.service;

import br.wpro.assessment.exception.CompetencePolicyNotFoundException;
import br.wpro.assessment.model.entity.AssessmentPolicy;
import br.wpro.assessment.model.entity.CompetencePolicy;
import org.bson.types.ObjectId;

import javax.enterprise.context.ApplicationScoped;
import java.util.HashMap;
import java.util.List;

@ApplicationScoped
public class AssessmentPolicyService {

    public AssessmentPolicy save(AssessmentPolicy policy) {
        policy.persistOrUpdate();
        return policy;

    }


    public AssessmentPolicy update(AssessmentPolicy policy) {
        policy.persistOrUpdate();
        return policy;
    }

    public AssessmentPolicy getById(ObjectId id) {
        return AssessmentPolicy.findById(id);
    }

    public List<AssessmentPolicy> list() {
        return AssessmentPolicy.listAll();
    }

    public void delete(ObjectId id) {
        AssessmentPolicy.deleteById(id);
    }

    /**
     * CompetencePolicy
     */
    public AssessmentPolicy addCompetence(ObjectId assessmentId, CompetencePolicy competencePolicy) {
        AssessmentPolicy policy = getById(assessmentId);

        if (policy.getCompetences() == null || policy.getCompetences().isEmpty()) {
            policy.setCompetences(new HashMap<>());
        }

        policy.getCompetences().put(competencePolicy.getId(), competencePolicy);

        policy.persistOrUpdate();
        return policy;
    }

    public AssessmentPolicy updateCompetence(ObjectId assessmentId, String competencePolicyId, final CompetencePolicy competencePolicy) {

        AssessmentPolicy policy = getById(assessmentId);

        if (policy.getCompetences() == null || policy.getCompetences().isEmpty() || !policy.getCompetences().containsKey(competencePolicyId)) {
            throw new CompetencePolicyNotFoundException(competencePolicyId);
        }

        final CompetencePolicy competencePolicyOrign = policy.getCompetences().get(competencePolicyId);
        competencePolicyOrign.updateFrom(competencePolicy);

        policy.getCompetences().put(competencePolicyOrign.getId(), competencePolicyOrign);

        policy.persistOrUpdate();
        return policy;
    }

    public void removeCompetence(ObjectId assessmentId, String competencePolicyId) throws CompetencePolicyNotFoundException {
        AssessmentPolicy policy = getById(assessmentId);

        if (policy.getCompetences() == null || policy.getCompetences().isEmpty() || !policy.getCompetences().containsKey(competencePolicyId)) {
            throw new CompetencePolicyNotFoundException(competencePolicyId);
        }

        policy.getCompetences().remove(competencePolicyId);

        policy.persistOrUpdate();

    }

}
