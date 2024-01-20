package com.myapp.surveybuilderapi.config.audit;

import java.util.Optional;
import org.springframework.data.domain.AuditorAware;

public class EntityAuditorAware implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        return Optional.empty();
    }
}
