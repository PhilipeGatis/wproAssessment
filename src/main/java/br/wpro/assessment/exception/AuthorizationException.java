package br.wpro.assessment.exception;

public class AuthorizationException extends BaseException {


    String userAuth;

    public AuthorizationException() {
    }

    public AuthorizationException(String userAuth) {
        this.userAuth = userAuth;
    }

    @Override
    public int getCode(){
        return 401;
    }

    @Override
    public String getMessage(){
        return "User not Authorized: "+ userAuth;
    }



}
