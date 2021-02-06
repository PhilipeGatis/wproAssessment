package br.wpro.assessment.exception;

public class InvalidUserOrPasswordException extends BaseException {

    @Override
    public int getCode(){
        return 500;
    }

    @Override
    public String getMessage(){
        return "Usuário ou Senha inválidos";
    }



}
