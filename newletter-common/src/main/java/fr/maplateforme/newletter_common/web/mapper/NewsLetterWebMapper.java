package fr.maplateforme.newletter_common.web.mapper;

import fr.maplateforme.newletter_common.business.mapper.SubscribesNewsLetter;
import fr.maplateforme.newletter_common.business.model.newsletter.CreateNewsletter;
import fr.maplateforme.newletter_common.business.model.newsletter.NewsLetter;
import fr.maplateforme.newletter_common.business.model.newsletter.UpdateNewsletter;
import fr.maplateforme.newletter_common.web.dto.CreateNewsletterDTO;
import fr.maplateforme.newletter_common.web.dto.NewsLetterDTO;
import fr.maplateforme.newletter_common.web.dto.SubscribesNewsLetterDTO;
import fr.maplateforme.newletter_common.web.dto.UpdateNewsletterDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Collection;

@Mapper(componentModel = "spring", uses = CommonMapper.class)
public interface NewsLetterWebMapper {

    Collection<NewsLetterDTO> map(Collection<NewsLetter> newsletters);

    NewsLetterDTO map(NewsLetter newsletter);


    @Mapping(target = "name", source = "name", qualifiedByName = "lowercase")
    CreateNewsletter map(CreateNewsletterDTO createNewsletter);

    UpdateNewsletter map(UpdateNewsletterDTO updateNewsletterDTO);

    @Mapping(target = "firstname", source = "firstname", qualifiedByName = "lowercase")
    @Mapping(target = "lastname", source = "lastname", qualifiedByName = "lowercase")
    @Mapping(target = "email", source = "email", qualifiedByName = "lowercase")
    SubscribesNewsLetter map(SubscribesNewsLetterDTO subscribesNewsletter);

}
