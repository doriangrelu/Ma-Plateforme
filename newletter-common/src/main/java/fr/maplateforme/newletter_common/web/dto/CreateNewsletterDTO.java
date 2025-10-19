package fr.maplateforme.newletter_common.web.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.extern.jackson.Jacksonized;
import org.hibernate.validator.constraints.Length;

@Jacksonized
@Builder
public record CreateNewsletterDTO(
        @NotBlank @Length(max = 255) String name,
        boolean enabled
) {
}
