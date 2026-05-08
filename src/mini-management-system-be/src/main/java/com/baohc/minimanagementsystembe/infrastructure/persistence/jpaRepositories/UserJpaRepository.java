package com.baohc.minimanagementsystembe.infrastructure.persistence.jpaRepositories;

import com.baohc.minimanagementsystembe.infrastructure.persistence.entities.UserJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserJpaRepository extends JpaRepository<UserJpaEntity, Long> {
}
