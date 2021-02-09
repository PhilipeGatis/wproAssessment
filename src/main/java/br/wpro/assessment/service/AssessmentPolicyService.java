package br.wpro.assessment.service;

import br.wpro.assessment.model.entity.AssessmentPolicy;
import br.wpro.assessment.model.entity.CompetencePolicy;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class AssessmentPolicyService {

    public AssessmentPolicy save(AssessmentPolicy policy) {
        policy.persist();
        return policy;
    }

    public AssessmentPolicy getById(String id) {
        return AssessmentPolicy.findById(id);
    }

    public List<AssessmentPolicy> list() {
        return AssessmentPolicy.listAll();
    }

    public void delete(String id) {
        AssessmentPolicy.deleteById(id);
    }

}
