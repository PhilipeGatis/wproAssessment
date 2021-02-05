package br.wpro.assessment.model.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.mongodb.panache.MongoEntity;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;
import java.util.UUID;

@MongoEntity(collection="ConfigurationAssessmentPolicy")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ConfigurationAssessmentPolicy extends PanacheMongoEntity {

    @Builder.Default
    Boolean active = Boolean.FALSE;


    //Many COofigutarions fields that will be definited


}
