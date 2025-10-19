package fr.maplateforme.newletter_common.web;


import fr.maplateforme.newletter_common.business.exception.NewsLetterAlreadyExistsException;
import fr.maplateforme.newletter_common.business.service.NewsLetterService;
import fr.maplateforme.newletter_common.web.dto.NewsLetterDTO;
import fr.maplateforme.newletter_common.web.mapper.WebMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/newsletters")
@RequiredArgsConstructor
public class ListNewsLetterResource {

    private final NewsLetterService newsLetterService;
    private final WebMapper mapper;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Collection<NewsLetterDTO>> handle(
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "100") Integer size,
            final JwtAuthenticationToken principal
    ) throws NewsLetterAlreadyExistsException {
        return ResponseEntity.ok(
                this.mapper.map(
                        this.newsLetterService.listAll(
                                principal.getName(),
                                PageRequest.of(page, size, Sort.by("createdAt").descending())
                        )
                )
        );
    }


}
