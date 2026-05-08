package com.baohc.minimanagementsystembe.infrastructure.persistence.jpaRepositories;

import com.baohc.minimanagementsystembe.infrastructure.persistence.entities.VoucherUsageJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoucherUsageJpaRepository extends JpaRepository<VoucherUsageJpaEntity, Long> {
}
