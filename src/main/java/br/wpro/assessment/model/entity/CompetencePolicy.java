package br.wpro.assessment.model.entity;

import br.wpro.assessment.config.CompetenceCalcEnum;
import io.quarkus.mongodb.panache.MongoEntity;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@MongoEntity(collection="CompetencePolicy", database = "Assessment")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class CompetencePolicy extends PanacheMongoEntity {

    String name;

    String description;

    @Builder.Default
    Boolean primaryType = Boolean.TRUE;

    @Builder.Default
    Boolean active = Boolean.FALSE;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    CompetenceCalcEnum calculation = CompetenceCalcEnum.SUM;

    @OneToMany
    List<CriteriaPolicy> critereas;


}
