package br.wpro.assessment.exception;

public class CriteriaPolicyNotFoundException extends BaseException {


    String competencePolicyId;

    public CriteriaPolicyNotFoundException() {
    }

    public CriteriaPolicyNotFoundException(String competencePolicyId) {
        this.competencePolicyId = competencePolicyId;
    }

    @Override
    public int getCode(){
        return 404;
    }

    @Override
    public String getMessage(){
        return "Criterio não encontrado: "+competencePolicyId;
    }



}
