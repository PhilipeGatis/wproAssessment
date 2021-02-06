package br.wpro.assessment.service;

import br.wpro.assessment.model.entity.AssessmentPolicy;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class AssessmentPolicyService {

    public AssessmentPolicy save(AssessmentPolicy policy) {
        policy.persist();
        return policy;
    }

    public AssessmentPolicy getById(Long id) {
        return AssessmentPolicy.findById(id);
    }

    public List<AssessmentPolicy> list() {
        return AssessmentPolicy.listAll();
    }


}
