package fr.maplateforme.newletter_common.web;

import fr.maplateforme.newletter_common.business.exception.NewsLetterAlreadyExistsException;
import fr.maplateforme.newletter_common.business.service.NewsLetterService;
import fr.maplateforme.newletter_common.web.dto.CreateNewsletterDTO;
import fr.maplateforme.newletter_common.web.dto.NewsLetterDTO;
import fr.maplateforme.newletter_common.web.mapper.WebMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/newsletters")
@RequiredArgsConstructor
public class CreatesNewsLetterResource {

    private final NewsLetterService newsLetterService;
    private final WebMapper mapper;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<NewsLetterDTO> handle(final JwtAuthenticationToken principal, final @RequestBody @Valid CreateNewsletterDTO request) throws NewsLetterAlreadyExistsException {
        return ResponseEntity.ok(
                this.mapper.map(
                        this.newsLetterService.creates(principal.getName(), this.mapper.map(request))
                )
        );
    }


}

