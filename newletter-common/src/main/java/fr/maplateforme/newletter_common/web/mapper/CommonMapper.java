package fr.maplateforme.newletter_common.web.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface CommonMapper {

    @Named("lowercase")
    default String toLowerCase(final String value) {
        final String trimmed = this.trim(value);
        if (null == trimmed) {
            return null;
        }
        return trimmed.toLowerCase();
    }

    @Named("trim")
    default String trim(final String value) {
        if (null == value) {
            return null;
        }
        return value.trim();
    }

}
