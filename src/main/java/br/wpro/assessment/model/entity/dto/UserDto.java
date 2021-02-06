package br.wpro.assessment.model.entity.dto;


import br.wpro.assessment.config.RolesEnum;
import br.wpro.assessment.model.entity.User;
import io.quarkus.mongodb.panache.MongoEntity;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import lombok.*;

import javax.persistence.*;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class UserDto {

    String firstName;
    String lastName;
    String login;

    @Enumerated(EnumType.STRING)
    RolesEnum role = RolesEnum.USER;

    public static UserDto of(User user){
        return UserDto.builder().firstName(user.getFirstName()).lastName(user.getLastName()).login(user.getLogin()).role(user.getRole()).build();
    }


}
