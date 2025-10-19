package fr.maplateforme.newletter_common.infrastructure;

import fr.maplateforme.newletter_common.infrastructure.audit.DefaultAuditorAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "defaultAuditorAware")
public class DatabaseConfiguration {

    @Bean
    public DefaultAuditorAware defaultAuditorAware() {
        return new DefaultAuditorAware();
    }

}
