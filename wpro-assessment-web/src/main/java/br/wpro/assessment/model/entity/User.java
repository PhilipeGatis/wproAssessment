package br.wpro.assessment.model.entity;


import br.wpro.assessment.config.RolesEnum;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.mongodb.panache.MongoEntity;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import lombok.*;

import javax.persistence.*;
import java.util.UUID;

@MongoEntity(collection="User")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class User extends PanacheMongoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    UUID uid;
    String firstName;
    String lastName;
    String login;
    String password;

    @Enumerated(EnumType.STRING)
    RolesEnum role = RolesEnum.USER;


}
