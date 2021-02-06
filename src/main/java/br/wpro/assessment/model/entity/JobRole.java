package br.wpro.assessment.model.entity;


import br.wpro.assessment.config.RolesEnum;
import io.quarkus.mongodb.panache.MongoEntity;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import lombok.*;

import javax.persistence.*;
import java.util.UUID;

@MongoEntity(collection="Assessment")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class JobRole extends PanacheMongoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID uid;
    String externalId;
    String name;


}
