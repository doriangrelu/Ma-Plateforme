package fr.maplateforme.newletter_common.business.mapper;

import fr.maplateforme.newletter_common.business.model.CreateNewsletter;
import fr.maplateforme.newletter_common.business.model.NewsLetter;
import fr.maplateforme.newletter_common.infrastructure.entity.NewsLetterEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface BusinessMapper {

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
