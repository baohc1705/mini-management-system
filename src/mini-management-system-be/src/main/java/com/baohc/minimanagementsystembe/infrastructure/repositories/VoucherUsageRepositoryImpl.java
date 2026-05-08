package com.baohc.minimanagementsystembe.infrastructure.repositories;

import com.baohc.minimanagementsystembe.domain.entities.VoucherUsage;
import com.baohc.minimanagementsystembe.domain.exceptions.AppException;
import com.baohc.minimanagementsystembe.domain.exceptions.ErrorCode;
import com.baohc.minimanagementsystembe.domain.repositories.VoucherUsageRepository;
import com.baohc.minimanagementsystembe.infrastructure.persistence.jpaRepositories.VoucherUsageJpaRepository;
import com.baohc.minimanagementsystembe.infrastructure.persistence.mappers.VoucherUsageJpaEntityMapping;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class VoucherUsageRepositoryImpl implements VoucherUsageRepository {
    private final VoucherUsageJpaRepository voucherUsageJpaRepository;
    private final VoucherUsageJpaEntityMapping voucherUsageJpaEntityMapping;

    @Override
    public VoucherUsage findById(Long id) {
        var jpaEntity = voucherUsageJpaRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.VOUCHER_USAGE_NOT_FOUND));
        return voucherUsageJpaEntityMapping.toDomain(jpaEntity);
    }

    @Override
    public List<VoucherUsage> findAll() {
        return voucherUsageJpaRepository.findAll().stream()
                .map(voucherUsageJpaEntityMapping::toDomain)
                .toList();
    }

    @Override
    public Page<VoucherUsage> findAll(Pageable pageable) {
        return voucherUsageJpaRepository.findAll(pageable)
                .map(voucherUsageJpaEntityMapping::toDomain);
    }

    @Override
    public VoucherUsage save(VoucherUsage entity) {
        var jpaEntity = voucherUsageJpaEntityMapping.toJpaEntity(entity);
        var savedEntity = voucherUsageJpaRepository.save(jpaEntity);
        return voucherUsageJpaEntityMapping.toDomain(savedEntity);
    }

    @Override
    public void update(VoucherUsage entity) {
        var jpaEntity = voucherUsageJpaEntityMapping.toJpaEntity(entity);
        voucherUsageJpaRepository.save(jpaEntity);
    }

    @Override
    public void delete(Long id) {
        voucherUsageJpaRepository.deleteById(id);
    }

    @Override
    public long count() {
        return voucherUsageJpaRepository.count();
    }
}
