package br.wpro.assessment.model.entity;

import br.wpro.assessment.config.CompetenceCalcEnum;
import br.wpro.assessment.config.CriteriaValueTypeEnum;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.mongodb.panache.MongoEntity;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import lombok.*;
import org.dom4j.rule.Rule;

import javax.persistence.*;
import java.util.Map;
import java.util.UUID;

@MongoEntity(collection="CriteriaPolicy")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class CriteriaPolicy extends PanacheMongoEntity {

    String name;

    String question;

    @Builder.Default
    Boolean justification = Boolean.TRUE;

    @Builder.Default
    Boolean justificationRequired = Boolean.FALSE;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    CriteriaValueTypeEnum valueType = CriteriaValueTypeEnum.INTERVAL_NUMBER;
    String rule = "1-5"; // interval - , list ; , Percentage 0%, Text begin @


}
