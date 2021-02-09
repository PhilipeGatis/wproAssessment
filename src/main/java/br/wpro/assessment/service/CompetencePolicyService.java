package br.wpro.assessment.service;

import br.wpro.assessment.model.entity.CompetencePolicy;
import br.wpro.assessment.model.entity.JobRole;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class CompetencePolicyService {

    public CompetencePolicy save(CompetencePolicy policy) {
        policy.persistOrUpdate();
        return policy;
    }

    public CompetencePolicy getById(Long id){
        return CompetencePolicy.findById(id);
    }

    public List<CompetencePolicy> list(){
        return CompetencePolicy.listAll();
    }


    public void delete(String id){
        CompetencePolicy.deleteById(id);
    }
}
