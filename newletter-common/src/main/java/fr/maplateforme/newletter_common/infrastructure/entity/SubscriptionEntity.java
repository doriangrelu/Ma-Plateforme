package fr.maplateforme.newletter_common.infrastructure.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

@Entity(name = "subscriptions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class SubscriptionEntity {

    @Id
    @UuidGenerator
    private String id;

    @Column(nullable = false, length = 255)
    private String firstname;
    @Column(length = 255)
    private String lastname;
    @Column(nullable = false, length = 355)
    private String mail;

    @CreatedBy
    private String createdBy;
    @CreatedDate
    private Instant createdDate;

    @LastModifiedBy
    private String updatedBy;
    @LastModifiedDate
    private Instant updatedDate;


}
