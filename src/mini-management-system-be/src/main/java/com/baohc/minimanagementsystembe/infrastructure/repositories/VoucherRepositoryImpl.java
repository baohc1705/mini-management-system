package com.baohc.minimanagementsystembe.infrastructure.repositories;

import com.baohc.minimanagementsystembe.domain.entities.User;
import com.baohc.minimanagementsystembe.domain.entities.Voucher;
import com.baohc.minimanagementsystembe.domain.enums.VoucherStatus;
import com.baohc.minimanagementsystembe.domain.repositories.VoucherRepository;
import com.baohc.minimanagementsystembe.domain.repositories.VoucherUsageRepository;
import com.baohc.minimanagementsystembe.infrastructure.persistence.jpaRepositories.VoucherJpaRepository;
import com.baohc.minimanagementsystembe.infrastructure.persistence.mappers.VoucherJpaEntityMapping;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
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
                .orElseThrow(() -> new RuntimeException("Voucher not found"));
        return voucherJpaEntityMapping.toDomain(voucherJpa);
    }

    @Override
    public Voucher findByCode(String code) {
        var voucherJpa =  voucherJpaRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Voucher not found"));
        return voucherJpaEntityMapping.toDomain(voucherJpa);
    }

    @Override
    public List<Voucher> findAll() {
        return voucherJpaRepository.findAll().stream()
                .map(voucherJpaEntityMapping::toDomain)
                .filter(voucher -> voucher.getStatus() == VoucherStatus.ACTIVE)
                .toList();
    }

    @Override
    @Transactional
    public Voucher save(Voucher user) {
        var voucherJpaEntity = voucherJpaEntityMapping.toJpaEntity(user);
        var savedVoucher = voucherJpaRepository.save(voucherJpaEntity);
        return voucherJpaEntityMapping.toDomain(savedVoucher);
    }

    @Override
    public void delete(Long id) {
        var voucherJpa = voucherJpaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Voucher not found"));
        voucherJpa.setStatus(VoucherStatus.INACTIVE);
        voucherJpaRepository.save(voucherJpa);
    }

    @Override
    public void update(Voucher user) {
        var voucherJpa = voucherJpaRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("Voucher not found"));
        voucherJpa.setDiscountPercent(user.getDiscountPercent());
        voucherJpa.setQuantity(user.getQuantity());
        voucherJpa.setExpiredDate(user.getExpiredDate());
        voucherJpaRepository.save(voucherJpa);
    }
}
