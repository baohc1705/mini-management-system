package com.baohc.minimanagementsystembe.infrastructure.persistence.mappers;

import com.baohc.minimanagementsystembe.domain.entities.User;
import com.baohc.minimanagementsystembe.infrastructure.persistence.entities.UserJpaEntity;
import org.springframework.stereotype.Component;

@Component
public class UserJpaEntityMapping {
    public User toDomain(UserJpaEntity userJpaEntity) {
        User user = new User();
        user.setId(userJpaEntity.getId());
        user.setFullName(userJpaEntity.getFullName());
        user.setEmail(userJpaEntity.getEmail());
        user.setPhone(userJpaEntity.getPhone());
        user.setCreatedAt(userJpaEntity.getCreatedAt());
        return user;
    }

    public  UserJpaEntity toJpaEntity(User user) {
        UserJpaEntity userJpaEntity = new UserJpaEntity();
        userJpaEntity.setId(user.getId());
        userJpaEntity.setFullName(user.getFullName());
        userJpaEntity.setEmail(user.getEmail());
        userJpaEntity.setPhone(user.getPhone());
        userJpaEntity.setCreatedAt(user.getCreatedAt());
        return userJpaEntity;
    }
}
