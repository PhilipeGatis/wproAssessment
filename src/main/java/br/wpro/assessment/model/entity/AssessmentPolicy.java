package br.wpro.assessment.model.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.mongodb.panache.MongoEntity;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@MongoEntity(collection="Assessment")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class AssessmentPolicy extends PanacheMongoEntity {

    String name;

    @Builder.Default
    Boolean active = Boolean.FALSE;


    //Child compentences
    List<CompetencePolicy> competences;

    //Not a Child, just a left relation
    ConfigurationAssessmentPolicy configurationAssessmentPolicy;

}
