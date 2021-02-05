package br.wpro.assessment.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public enum CriteriaValueTypeEnum {
    NUMBER,
    TEXT,
    INTERVAL_NUMBER,
    OPTION_LIST_SINGLE,
    OPTION_LIST_MULTI,
    PERCENTAGE

}
