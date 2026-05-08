package com.baohc.minimanagementsystembe.infrastructure.persistence.jpaRepositories;

import com.baohc.minimanagementsystembe.domain.entities.VoucherUsage;
import com.baohc.minimanagementsystembe.infrastructure.persistence.entities.VoucherUsageJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface VoucherUsageJpaRepository extends JpaRepository<VoucherUsageJpaEntity, Long> {
}
