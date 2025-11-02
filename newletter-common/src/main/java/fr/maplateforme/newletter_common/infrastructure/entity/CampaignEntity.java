package fr.maplateforme.newletter_common.infrastructure.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

@Entity(name = "campaigns")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class CampaignEntity {

    @Id
    @UuidGenerator
    private String id;

    @Column(nullable = false, length = 255)
    private String name;
    @Column(nullable = false, length = 600)
    private String description;

    @Lob
    @Column(nullable = false)
    private String content;

    @Lob
    @Column(nullable = false)
    private String design;

    private Instant sendAt;

    private boolean sent = false;
    private boolean enabled = false;

    @ManyToOne(optional = false)
    private NewsLetterEntity newsletter;

    @CreatedBy
    private String createdBy;
    @CreatedDate
    private Instant createdAt;

    @LastModifiedBy
    private String updatedBy;
    @LastModifiedDate
    private Instant updatedAt;

    public void attach(final NewsLetterEntity newsletter) {
        this.newsletter = newsletter;
        newsletter.getCampaigns().add(this);
    }

}
