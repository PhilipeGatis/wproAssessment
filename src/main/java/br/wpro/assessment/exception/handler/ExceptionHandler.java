package br.wpro.assessment.exception.handler;


import br.wpro.assessment.exception.BaseException;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;


@Provider
public class ExceptionHandler implements ExceptionMapper<BaseException> {

    @Override
    public Response toResponse(final BaseException exception) {
        return Response.status(exception.getCode())
                .entity(exception.getMessage())
                .build();
    }
}
