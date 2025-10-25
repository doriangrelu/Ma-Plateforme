package fr.maplateforme.newletter_common.business.mapper;

import fr.maplateforme.newletter_common.business.model.newsletter.CreateNewsletter;
import fr.maplateforme.newletter_common.business.model.newsletter.NewsLetter;
import fr.maplateforme.newletter_common.infrastructure.entity.NewsLetterEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface NewsLetterMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "name", source = "createNewsletter.name")
    @Mapping(target = "enabled", source = "createNewsletter.enabled")
    @Mapping(target = "owner", source = "owner")
    @Mapping(target = "campaigns", ignore = true)
    @Mapping(target = "subscriptions", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    NewsLetterEntity map(CreateNewsletter createNewsletter, String owner);

    NewsLetter map(NewsLetterEntity newsLetterEntity);

}
