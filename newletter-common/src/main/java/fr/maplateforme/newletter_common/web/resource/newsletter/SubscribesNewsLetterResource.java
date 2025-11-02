package fr.maplateforme.newletter_common.web.resource.newsletter;

import fr.maplateforme.newletter_common.business.service.NewsLetterService;
import fr.maplateforme.newletter_common.web.dto.newsletter.SubscribesNewsLetterDTO;
import fr.maplateforme.newletter_common.web.mapper.NewsLetterWebMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/newsletters/subscriptions")
@RequiredArgsConstructor
public class SubscribesNewsLetterResource {


    private final NewsLetterService newsLetterService;
    private final NewsLetterWebMapper mapper;

    @PostMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> handle(
            final @PathVariable("id") String id,
            final @Valid @RequestBody SubscribesNewsLetterDTO subscribesNewsLetterDTO
    ) {
        this.newsLetterService.subscribe(id, this.mapper.map(subscribesNewsLetterDTO));
        return ResponseEntity.noContent().build();
    }

}
