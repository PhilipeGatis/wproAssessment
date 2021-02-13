package br.wpro.assessment.model.entity;

import io.quarkus.mongodb.panache.MongoEntity;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import lombok.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@MongoEntity(collection="AssessmentPolicy", database = "Assessment")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class AssessmentPolicy extends PanacheMongoEntity {

    String name;
    String description;

    @Builder.Default
    Boolean active = Boolean.FALSE;

    //Child compentences
    Map<String, CompetencePolicy> competences;

    //Not a Child, just a left relation
    List<String> idConfigurationAssessmentPolicy;

}
