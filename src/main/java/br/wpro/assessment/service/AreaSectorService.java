package br.wpro.assessment.service;

import br.wpro.assessment.model.entity.AreaSector;
import br.wpro.assessment.model.entity.JobRole;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class AreaSectorService {

    public AreaSector save(AreaSector areaSector) {
        areaSector.persistOrUpdate();
        return areaSector;
    }

    public AreaSector getById(String id) {
        return AreaSector.findById(id);
    }

    public AreaSector getByName(String name) {
        return AreaSector.find("name", name).firstResult();
    }

    public List<AreaSector> list() {
        return AreaSector.listAll();
    }

}
