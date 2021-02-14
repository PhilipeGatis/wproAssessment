package br.wpro.assessment.service;

import br.wpro.assessment.exception.CompetencePolicyNotFoundException;
import br.wpro.assessment.exception.CriteriaPolicyNotFoundException;
import br.wpro.assessment.model.entity.AssessmentPolicy;
import br.wpro.assessment.model.entity.CompetencePolicy;
import br.wpro.assessment.model.entity.CriteriaPolicy;
import org.bson.types.ObjectId;

import javax.enterprise.context.ApplicationScoped;
import java.util.LinkedHashMap;
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
            policy.setCompetences(new LinkedHashMap<>());
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


    /**
     * CriteriaPolicy
     */
    public AssessmentPolicy addCompetenceCriteria(ObjectId assessmentId, String competencePolicyId, CriteriaPolicy criteriaPolicy) {
        AssessmentPolicy assessmentPolicy = getById(assessmentId);

        if (assessmentPolicy.getCompetences() == null || assessmentPolicy.getCompetences().isEmpty() || !assessmentPolicy.getCompetences().containsKey(competencePolicyId)) {
            throw new CompetencePolicyNotFoundException("No CompecentePolicy with Id "+competencePolicyId+ " to Add Criterea "+criteriaPolicy);
        }

        CompetencePolicy competencePolicy = assessmentPolicy.getCompetences().get(competencePolicyId);

        if(competencePolicy.getCritereas() == null || competencePolicy.getCritereas().isEmpty()){
            competencePolicy.setCritereas(new LinkedHashMap<>());
        }

        competencePolicy.getCritereas().put(criteriaPolicy.getId(), criteriaPolicy);

        assessmentPolicy.persistOrUpdate();

        return assessmentPolicy;
    }

    public AssessmentPolicy updateCompetenceCriteria(ObjectId assessmentId, String competencePolicyId, String criteriaId, final CriteriaPolicy criteriaPolicy) {

        AssessmentPolicy policy = getById(assessmentId);

        if (policy.getCompetences() == null || policy.getCompetences().isEmpty() || !policy.getCompetences().containsKey(competencePolicyId)) {
            throw new CompetencePolicyNotFoundException(competencePolicyId);
        }

        final CompetencePolicy competencePolicy = policy.getCompetences().get(competencePolicyId);

        final CriteriaPolicy criteriaPolicyOrign = competencePolicy.getCritereas().get(criteriaId);
        criteriaPolicyOrign.updateFrom(criteriaPolicy);

        competencePolicy.getCritereas().put(criteriaPolicyOrign.getId(), criteriaPolicyOrign);

        policy.persistOrUpdate();

        return policy;
    }

    public void removeCompetenceCriterea(ObjectId assessmentId, String competencePolicyId, String critereaPolicyId) throws CompetencePolicyNotFoundException {
        AssessmentPolicy policy = getById(assessmentId);

        if (policy.getCompetences() == null || policy.getCompetences().isEmpty() || !policy.getCompetences().containsKey(competencePolicyId)) {
            throw new CompetencePolicyNotFoundException(competencePolicyId);
        }

        CompetencePolicy competencePolicy =  policy.getCompetences().get(competencePolicyId);

        if (competencePolicy.getCritereas() == null || competencePolicy.getCritereas().isEmpty() || !competencePolicy.getCritereas().containsKey(critereaPolicyId)) {
            throw new CriteriaPolicyNotFoundException(competencePolicyId);
        }

        competencePolicy.getCritereas().remove(critereaPolicyId);

        policy.persistOrUpdate();

    }

}
