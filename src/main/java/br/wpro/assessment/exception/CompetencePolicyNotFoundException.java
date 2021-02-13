package br.wpro.assessment.exception;

public class CompetencePolicyNotFoundException extends BaseException {


    String competencePolicyId;

    public CompetencePolicyNotFoundException() {
    }

    public CompetencePolicyNotFoundException(String competencePolicyId) {
        this.competencePolicyId = competencePolicyId;
    }

    @Override
    public int getCode(){
        return 404;
    }

    @Override
    public String getMessage(){
        return "Competência não encontrada: "+competencePolicyId;
    }



}
