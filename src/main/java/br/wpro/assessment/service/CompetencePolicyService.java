package br.wpro.assessment.service;

import br.wpro.assessment.model.entity.CompetencePolicy;
import br.wpro.assessment.model.entity.JobRole;
import org.bson.types.ObjectId;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class CompetencePolicyService {

    public CompetencePolicy save(CompetencePolicy policy) {
        policy.persist();
        return policy;
    }

    public CompetencePolicy update(CompetencePolicy policy) {
        policy.update();
        return policy;
    }

    public CompetencePolicy getById(ObjectId id){
        return CompetencePolicy.findById(id);
    }

    public List<CompetencePolicy> list(){
        return CompetencePolicy.listAll();
    }


    public void delete(ObjectId id){
        CompetencePolicy.deleteById(id);
    }
}
