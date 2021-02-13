package br.wpro.assessment.service;

import br.wpro.assessment.model.entity.AssessmentPolicy;
import br.wpro.assessment.model.entity.CompetencePolicy;
import org.bson.types.ObjectId;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class AssessmentPolicyService {

    public AssessmentPolicy save(AssessmentPolicy policy) {
        policy.persist();
        return policy;
    }

    public AssessmentPolicy update(AssessmentPolicy policy) {
        policy.update();
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

}
