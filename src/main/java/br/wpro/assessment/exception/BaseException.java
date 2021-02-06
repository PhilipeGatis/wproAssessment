package br.wpro.assessment.exception;

public class BaseException extends RuntimeException {


    public int getCode(){
        return 500;
    }

    public String getMessage(){
        return "Erro ao processar requisição [Verifique os logs com o administrador do sistema]";
    }


}
