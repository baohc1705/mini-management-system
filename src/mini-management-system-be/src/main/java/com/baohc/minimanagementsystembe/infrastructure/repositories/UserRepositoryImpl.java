package com.baohc.minimanagementsystembe.infrastructure.repositories;

import com.baohc.minimanagementsystembe.domain.entities.User;
import com.baohc.minimanagementsystembe.domain.repositories.UserRepository;
import com.baohc.minimanagementsystembe.infrastructure.persistence.entities.UserJpaEntity;
import com.baohc.minimanagementsystembe.infrastructure.persistence.jpaRepositories.UserJpaRepository;
import com.baohc.minimanagementsystembe.infrastructure.persistence.mappers.UserJpaEntityMapping;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepository {
    private final UserJpaRepository userJpaRepository;
    private final UserJpaEntityMapping userJpaEntityMapping;

    @Override
    public User findById(Long id) {
        UserJpaEntity userJpa= userJpaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userJpaEntityMapping.toDomain(userJpa);
    }

    @Override
    public List<User> findAll() {
        return userJpaRepository.findAll().stream()
                .map(userJpaEntityMapping::toDomain)
                .toList();
    }

    @Override
    @Transactional
    public User save(User user) {
        UserJpaEntity request = userJpaEntityMapping.toJpaEntity(user);
        UserJpaEntity savedUser = userJpaRepository.save(request);
        return userJpaEntityMapping.toDomain(savedUser);
    }

    @Override
    public void update(User user) {
        var userJpaEntity = userJpaRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        userJpaEntity.setFullName(user.getFullName());
        userJpaEntity.setEmail(user.getEmail());
        userJpaEntity.setPhone(user.getPhone());
        userJpaRepository.save(userJpaEntity);
    }
}
