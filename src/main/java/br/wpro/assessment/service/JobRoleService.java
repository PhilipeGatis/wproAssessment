package br.wpro.assessment.service;

import br.wpro.assessment.exception.InvalidUserOrPasswordException;
import br.wpro.assessment.model.entity.JobRole;
import br.wpro.assessment.model.entity.User;
import br.wpro.assessment.model.entity.dto.UserDto;
import br.wpro.assessment.utils.Utils;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class JobRoleService {

    public JobRole save(JobRole jobRole) {
        jobRole.persistOrUpdate();
        return jobRole;
    }

    public JobRole getById(String id) {
        return JobRole.findById(id);
    }

    public JobRole getByName(String name) {
        return JobRole.find("name", name).firstResult();
    }

    public List<JobRole> list() {
        return JobRole.listAll();
    }


}
