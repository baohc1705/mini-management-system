package com.baohc.minimanagementsystembe.infrastructure.persistence.jpaRepositories;

import com.baohc.minimanagementsystembe.infrastructure.persistence.entities.UserJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface UserJpaRepository extends JpaRepository<UserJpaEntity, Long> {
}
