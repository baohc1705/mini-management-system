package com.baohc.minimanagementsystembe.infrastructure.repositories;

import com.baohc.minimanagementsystembe.domain.entities.Voucher;
import com.baohc.minimanagementsystembe.domain.enums.VoucherStatus;
import com.baohc.minimanagementsystembe.domain.repositories.VoucherRepository;
import com.baohc.minimanagementsystembe.domain.exceptions.AppException;
import com.baohc.minimanagementsystembe.domain.exceptions.ErrorCode;
import com.baohc.minimanagementsystembe.infrastructure.persistence.jpaRepositories.VoucherJpaRepository;
import com.baohc.minimanagementsystembe.infrastructure.persistence.mappers.VoucherJpaEntityMapping;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class VoucherRepositoryImpl implements VoucherRepository {
    private final VoucherJpaRepository voucherJpaRepository;
    private final VoucherJpaEntityMapping voucherJpaEntityMapping;

    @Override
    public Voucher findById(Long id) {
        var voucherJpa =  voucherJpaRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.VOUCHER_NOT_FOUND));
        return voucherJpaEntityMapping.toDomain(voucherJpa);
    }

    @Override
    public Voucher findByCode(String code) {
        var voucherJpa =  voucherJpaRepository.findByCode(code)
                .orElseThrow(() -> new AppException(ErrorCode.VOUCHER_NOT_FOUND));
        return voucherJpaEntityMapping.toDomain(voucherJpa);
    }

    @Override
    public List<Voucher> findAll() {
        return voucherJpaRepository.findAll().stream()
                .map(voucherJpaEntityMapping::toDomain)
                .toList();
    }

    @Override
    public Page<Voucher> findAll(Pageable pageable) {
        return voucherJpaRepository.findAllPaginated(pageable)
                .map(voucherJpaEntityMapping::toDomain);
    }

    @Override
    @Transactional
    public Voucher save(Voucher voucher) {
        var voucherJpaEntity = voucherJpaEntityMapping.toJpaEntity(voucher);
        var savedVoucher = voucherJpaRepository.save(voucherJpaEntity);
        return voucherJpaEntityMapping.toDomain(savedVoucher);
    }

    @Override
    public void delete(Long id) {
        var voucherJpa = voucherJpaRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.VOUCHER_NOT_FOUND));
        voucherJpa.setStatus(VoucherStatus.INACTIVE);
        voucherJpaRepository.save(voucherJpa);
    }

    @Override
    public void update(Voucher voucher) {
        var voucherJpa = voucherJpaRepository.findById(voucher.getId())
                .orElseThrow(() -> new AppException(ErrorCode.VOUCHER_NOT_FOUND));
        voucherJpa.setDiscountPercent(voucher.getDiscountPercent());
        voucherJpa.setQuantity(voucher.getQuantity());
        voucherJpa.setExpiredDate(voucher.getExpiredDate());
        voucherJpaRepository.save(voucherJpa);
    }

    @Override
    public boolean existsByCode(String code) {
        return voucherJpaRepository.existsByCode(code);
    }

    @Override
    public long count() {
        return voucherJpaRepository.countActiveVouchers();
    }
}
