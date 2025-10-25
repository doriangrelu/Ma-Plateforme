package fr.maplateforme.newletter_common.business.model.newsletter;

import java.time.Instant;

public record NewsLetter(
        String id,
        String name,
        boolean enabled,
        Instant createdAt,
        Instant updatedAt
) {
}
