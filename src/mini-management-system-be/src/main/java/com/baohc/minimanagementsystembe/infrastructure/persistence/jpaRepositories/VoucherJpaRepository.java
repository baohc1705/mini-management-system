package com.baohc.minimanagementsystembe.infrastructure.persistence.jpaRepositories;

import com.baohc.minimanagementsystembe.infrastructure.persistence.entities.VoucherJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface VoucherJpaRepository extends JpaRepository<VoucherJpaEntity, Long> {
    Optional<VoucherJpaEntity> findByCode(String code);

    boolean existsByCode(String code);

    @Query("SELECT v FROM VoucherJpaEntity v WHERE v.status = :status ORDER BY v.createdAt DESC")
    Page<VoucherJpaEntity> findAllPaginated(Pageable pageable, com.baohc.minimanagementsystembe.domain.enums.VoucherStatus status);

    @Query("SELECT COUNT(v) FROM VoucherJpaEntity v WHERE v.status = :status")
    long countActiveVouchers(com.baohc.minimanagementsystembe.domain.enums.VoucherStatus status);

}
