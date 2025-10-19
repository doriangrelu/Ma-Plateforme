package fr.maplateforme.newletter_common.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record SubscribesNewsLetterDTO(
        @NotBlank @Email String email,
        @Pattern(regexp = "^[a-zA-Z]+") String firstname,
        @Pattern(regexp = "^[a-zA-Z]+") String lastname
) {
}
