package fr.maplateforme.newletter_common.web.resource.newsletter;


import fr.maplateforme.newletter_common.business.service.NewsLetterService;
import fr.maplateforme.newletter_common.web.dto.NewsLetterDTO;
import fr.maplateforme.newletter_common.web.dto.PageDTO;
import fr.maplateforme.newletter_common.web.mapper.NewsLetterWebMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/newsletters")
@RequiredArgsConstructor
public class ListNewsLettersResource {

    private final NewsLetterService newsLetterService;
    private final NewsLetterWebMapper mapper;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PageDTO<NewsLetterDTO>> handle(
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "100") Integer size,
            final BearerTokenAuthentication principal
    ) {
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
