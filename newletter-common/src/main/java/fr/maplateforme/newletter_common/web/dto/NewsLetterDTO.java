package fr.maplateforme.newletter_common.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.UUID;

import java.time.Instant;

public record NewsLetterDTO(
        @NotBlank @UUID String id,
        @NotBlank String name,
        boolean enabled,
        @NotNull Instant createdAt,
        @NotNull Instant updatedAt
) {
}
