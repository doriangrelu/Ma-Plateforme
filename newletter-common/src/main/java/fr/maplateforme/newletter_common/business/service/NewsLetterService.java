package fr.maplateforme.newletter_common.business.service;

import fr.maplateforme.newletter_common.business.exception.NewsLetterAlreadyExistsException;
import fr.maplateforme.newletter_common.business.mapper.BusinessMapper;
import fr.maplateforme.newletter_common.business.mapper.SubscribesNewsLetter;
import fr.maplateforme.newletter_common.business.model.CreateNewsletter;
import fr.maplateforme.newletter_common.business.model.NewsLetter;
import fr.maplateforme.newletter_common.infrastructure.entity.NewsLetterEntity;
import fr.maplateforme.newletter_common.infrastructure.entity.SubscriptionEntity;
import fr.maplateforme.newletter_common.infrastructure.repository.NewsLetterRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Slf4j
@Service
@RequiredArgsConstructor
public class NewsLetterService {

    private final BusinessMapper mapper;
    private final NewsLetterRepository newsLetterRepository;

    public NewsLetter creates(final String owner, final CreateNewsletter createNewsletter) throws NewsLetterAlreadyExistsException {
        if (this.newsLetterRepository.existsByOwnerAndName(owner, createNewsletter.name())) {
            throw new NewsLetterAlreadyExistsException();
        }
        final NewsLetterEntity newsLetterEntity = this.newsLetterRepository.save(this.mapper.map(createNewsletter, owner));

        return this.mapper.map(newsLetterEntity);
    }

    public Collection<NewsLetter> listAll(final String owner, final Pageable pageable) {
        return this.newsLetterRepository.findByOwner(owner, pageable).stream()
                .map(mapper::map)
                .toList();
    }

    @Transactional
    public void subscribe(final String newsLetterId, final SubscribesNewsLetter subscribesNewsLetter) {
        if (this.newsLetterRepository.existsByIdAndSubscriptionsMail(newsLetterId, subscribesNewsLetter.email())) {
            securitySleep();
            log.warn("Already subscribed to: {}", newsLetterId);
            log.debug("Already subscribed to: {}", subscribesNewsLetter);
            return;
        }

        log.info("Subscribe to: {}", newsLetterId);
        log.debug("Subscribe to: {}", subscribesNewsLetter);

        final NewsLetterEntity newsLetter = this.newsLetterRepository.findByIdWithSubscriptions(newsLetterId).orElseThrow();
        final SubscriptionEntity subscriptionEntity = SubscriptionEntity.builder()
                .mail(subscribesNewsLetter.email())
                .firstname(subscribesNewsLetter.firstname())
                .lastname(subscribesNewsLetter.lastname())
                .build();

        newsLetter.getSubscriptions().add(subscriptionEntity);

        this.newsLetterRepository.save(newsLetter);
    }

    private static void securitySleep() {
        try {
            Thread.sleep(100);
        } catch (final InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

}
