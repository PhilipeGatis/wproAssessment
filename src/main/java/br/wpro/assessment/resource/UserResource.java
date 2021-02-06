package br.wpro.assessment.resource;

import br.wpro.assessment.model.entity.AssessmentPolicy;
import br.wpro.assessment.model.entity.User;
import br.wpro.assessment.model.entity.dto.UserDto;
import br.wpro.assessment.service.AssessmentPolicyService;
import br.wpro.assessment.service.UserService;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.nio.file.attribute.UserDefinedFileAttributeView;
import java.util.ArrayList;
import java.util.List;

@Path("/api/v1/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {

    @Inject
    UserService userService;

    @GET
    @Path("/hello")
    public String hello() {
        return "Hello User";
    }

    @GET
    public List<UserDto> list() {
        return userService.list();
    }

    @GET
    @Path("/{login}")
    public UserDto getByLogin(@PathParam String login) {
        return userService.getByLogin(login);
    }

    @GET
    @Path("/{id}")
    public UserDto getById(@PathParam String id) {
        return userService.getById(id);
    }

    @POST
    @Path("/create")
    public UserDto create(String login) {
        return userService.save(User.builder().login(login).build());
    }

    @PUT
    public UserDto save(User user){
        return userService.save(user);
    }


}