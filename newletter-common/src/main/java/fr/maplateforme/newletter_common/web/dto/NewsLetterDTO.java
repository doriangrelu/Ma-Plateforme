package fr.maplateforme.newletter_common.web.dto;

import java.time.Instant;

public record NewsLetterDTO(
        String id,
        String name,
        boolean enabled,
        Instant createdAt
) {
}
