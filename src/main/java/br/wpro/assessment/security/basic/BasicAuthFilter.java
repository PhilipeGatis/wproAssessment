package br.wpro.assessment.security.basic;

import br.wpro.assessment.config.RolesEnum;
import br.wpro.assessment.exception.AuthorizationException;
import br.wpro.assessment.model.entity.dto.UserDto;
import br.wpro.assessment.service.UserService;
import lombok.extern.slf4j.Slf4j;


import io.vertx.core.http.HttpServerRequest;

import javax.inject.Inject;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.ext.Provider;
import java.util.Base64;

@Provider
@Slf4j
public class BasicAuthFilter implements ContainerRequestFilter {


    public static final String BASIC_AUTH = "Authorization";

    @Context
    UriInfo info;

    @Inject
    UserService userService;

    @Context
    HttpServerRequest request;

    @Override
    public void filter(ContainerRequestContext context) {

        String auth = context.getHeaders().get(BASIC_AUTH).get(0);
        if (auth == null || auth.isEmpty() ){
            throw new AuthorizationException(auth);
        }

        auth = auth.replace("Basic","").replace("basic", "").trim();
        auth = new String(Base64.getDecoder().decode(auth.getBytes()));

        if (auth == null || auth.isEmpty() ){
            throw new AuthorizationException(auth);
        }

        String user = auth.substring(0, auth.indexOf(":"));
        String pass = auth.substring(auth.indexOf(":")+1, auth.length());

        UserDto dto = userService.getByLoginAndPassword(user, pass);
        if(dto == null || !dto.getRole().equals(RolesEnum.ADMIN)){
            throw new AuthorizationException(user);
        }

        final String method = context.getMethod();
        final String path = info.getPath();
        final String address = request.remoteAddress().toString();

        log.info("-> Request of user %s does %s at %s from IP %s", user, method, path, address);
    }
}
