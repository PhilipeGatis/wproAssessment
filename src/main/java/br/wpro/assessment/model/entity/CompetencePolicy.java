package br.wpro.assessment.model.entity;

import br.wpro.assessment.config.CompetenceCalcEnum;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.LinkedHashMap;
import java.util.UUID;

//@MongoEntity(collection="CompetencePolicy", database = "Assessment")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class CompetencePolicy {
//        extends PanacheMongoEntity {

    String id = UUID.randomUUID().toString();

    String name;

    String description;

    @Builder.Default
    Boolean primaryType = Boolean.TRUE;

    @Builder.Default
    Boolean active = Boolean.FALSE;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    CompetenceCalcEnum calculation = CompetenceCalcEnum.SUM;

    LinkedHashMap<String, CriteriaPolicy> critereas;

    public void updateFrom(CompetencePolicy policy){
        this.active = policy.active;
        this.calculation = policy.calculation;
        this.primaryType = policy.primaryType;
        this.description = policy.description;
        this.name = policy.name;
    }

}
