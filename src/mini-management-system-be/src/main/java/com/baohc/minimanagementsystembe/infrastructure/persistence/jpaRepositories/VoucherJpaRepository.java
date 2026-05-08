package com.baohc.minimanagementsystembe.infrastructure.persistence.jpaRepositories;

import com.baohc.minimanagementsystembe.infrastructure.persistence.entities.VoucherJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface VoucherJpaRepository extends JpaRepository<VoucherJpaEntity, Long> {
    Optional<VoucherJpaEntity> findByCode(String code);
}
