package fr.maplateforme.newletter_common.web.error;

import fr.maplateforme.newletter_common.business.exception.CampaignAlreadyExistsException;
import fr.maplateforme.newletter_common.business.exception.NewsLetterAlreadyExistsException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;
import java.util.NoSuchElementException;
import java.util.UUID;

@Slf4j
@RestControllerAdvice
public class ControllerAdvice {

    @ExceptionHandler(NewsLetterAlreadyExistsException.class)
    public ResponseEntity<ProblemDetail> handleNewsLetterAlreadyExistsException(final NewsLetterAlreadyExistsException ex) {
        return this.handle("Conflict, already exists", HttpStatus.CONFLICT, ex);
    }

    @ExceptionHandler(CampaignAlreadyExistsException.class)
    public ResponseEntity<ProblemDetail> handleCampaignAlreadyExistsException(final CampaignAlreadyExistsException ex) {
        return this.handle("Conflict, already exists", HttpStatus.CONFLICT, ex);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ProblemDetail> handleNoSuchElementException(final NoSuchElementException ex) {
        return this.handle("Element not found", HttpStatus.NOT_FOUND, ex);
    }

    private ResponseEntity<ProblemDetail> handle(final String message, final HttpStatus status, final Exception error) {
        return this.handle(message, status, error, Map.of());
    }

    private ResponseEntity<ProblemDetail> handle(final String message, final HttpStatus status, final Exception error, final Map<String, Object> properties) {
        final String id = UUID.randomUUID().toString();

        final ProblemDetail problemDetail = ProblemDetail.forStatus(status);
        problemDetail.setTitle(message);
        problemDetail.setDetail(id);
        problemDetail.setProperties(properties);

        log.error("[{}] {}", id, message, error);

        return new ResponseEntity<>(problemDetail, status);
    }


}
