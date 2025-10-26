package fr.maplateforme.newletter_common.business.service;

import fr.maplateforme.newletter_common.business.exception.NewsLetterAlreadyExistsException;
import fr.maplateforme.newletter_common.business.mapper.NewsLetterMapper;
import fr.maplateforme.newletter_common.business.mapper.SubscribesNewsLetter;
import fr.maplateforme.newletter_common.business.model.ContentPage;
import fr.maplateforme.newletter_common.business.model.newsletter.CreateNewsletter;
import fr.maplateforme.newletter_common.business.model.newsletter.NewsLetter;
import fr.maplateforme.newletter_common.business.model.newsletter.UpdateNewsletter;
import fr.maplateforme.newletter_common.infrastructure.entity.NewsLetterEntity;
import fr.maplateforme.newletter_common.infrastructure.entity.SubscriptionEntity;
import fr.maplateforme.newletter_common.infrastructure.repository.NewsLetterRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NewsLetterService {

    private final NewsLetterMapper mapper;
    private final NewsLetterRepository newsLetterRepository;

    @Transactional
    public NewsLetter creates(final String owner, final CreateNewsletter createNewsletter) throws NewsLetterAlreadyExistsException {
        if (this.newsLetterRepository.existsByOwnerAndName(owner, createNewsletter.name())) {
            throw new NewsLetterAlreadyExistsException();
        }
        final NewsLetterEntity newsLetterEntity = this.newsLetterRepository.save(this.mapper.map(createNewsletter, owner));

        return this.mapper.map(newsLetterEntity);
    }

    @Transactional
    public NewsLetter updates(final String owner, final String newsLetterId, final UpdateNewsletter updateNewsletter) {
        final NewsLetterEntity entity = this.newsLetterRepository.findByOwnerAndId(owner, newsLetterId)
                .orElseThrow();
        entity.setEnabled(updateNewsletter.enabled());
        return this.mapper.map(newsLetterRepository.save(entity));
    }

    public ContentPage<NewsLetter> listAll(final String owner, final Pageable pageable) {
        final Page<NewsLetterEntity> page = this.newsLetterRepository.findByOwner(owner, pageable);
        final List<NewsLetter> content = page.getContent().stream().map(this.mapper::map).toList();
        return ContentPage.of(
                content,
                page.getTotalElements(),
                page.getTotalPages(),
                page.getSize(),
                page.getNumber()
        );
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
