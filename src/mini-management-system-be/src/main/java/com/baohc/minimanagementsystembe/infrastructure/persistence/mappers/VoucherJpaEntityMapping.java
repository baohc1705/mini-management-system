package com.baohc.minimanagementsystembe.infrastructure.persistence.mappers;

import com.baohc.minimanagementsystembe.domain.entities.Voucher;
import com.baohc.minimanagementsystembe.infrastructure.persistence.entities.VoucherJpaEntity;
import org.springframework.stereotype.Component;

@Component
public class VoucherJpaEntityMapping {
    public Voucher toDomain(VoucherJpaEntity voucherJpaEntity) {
        Voucher voucher = new Voucher();
        voucher.setId(voucherJpaEntity.getId());
        voucher.setCode(voucherJpaEntity.getCode());
        voucher.setDiscountPercent(voucherJpaEntity.getDiscountPercent());
        voucher.setQuantity(voucherJpaEntity.getQuantity());
        voucher.setStatus(voucherJpaEntity.getStatus());
        voucher.setCreatedAt(voucherJpaEntity.getCreatedAt());
        return voucher;
    }

    public VoucherJpaEntity toJpaEntity(Voucher voucher) {
        VoucherJpaEntity voucherJpaEntity = new VoucherJpaEntity();
        voucherJpaEntity.setId(voucher.getId());
        voucherJpaEntity.setCode(voucher.getCode());
        voucherJpaEntity.setDiscountPercent(voucher.getDiscountPercent());
        voucherJpaEntity.setQuantity(voucher.getQuantity());
        voucherJpaEntity.setStatus(voucher.getStatus());
        voucherJpaEntity.setCreatedAt(voucher.getCreatedAt());
        return voucherJpaEntity;
    }
}
