package fr.maplateforme.newletter_common.infrastructure.repository;

import fr.maplateforme.newletter_common.infrastructure.entity.NewsLetterEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface NewsLetterRepository extends ListCrudRepository<NewsLetterEntity, String> {

    boolean existsByOwnerAndName(String owner, String name);

    Optional<NewsLetterEntity> findByOwnerAndId(String owner, String id);


    List<NewsLetterEntity> findByOwner(String owner, Pageable pageable);

    @Query("""
            select n from newsletters n
                        left join fetch subscriptions s
                                    where n.id=:id
            """)
    Optional<NewsLetterEntity> findByIdWithSubscriptions(@Param("id") String id);

    boolean existsByIdAndSubscriptionsMail(@Param("id") String idNewsletter, @Param("mail") String subscriptionEmail);

}
