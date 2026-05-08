package com.baohc.minimanagementsystembe.infrastructure.persistence.mappers;

import com.baohc.minimanagementsystembe.domain.entities.VoucherUsage;
import com.baohc.minimanagementsystembe.infrastructure.persistence.entities.VoucherUsageJpaEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class VoucherUsageJpaEntityMapping {
    private final UserJpaEntityMapping userJpaEntityMapping;
    private final VoucherJpaEntityMapping voucherJpaEntityMapping;

    public VoucherUsage toDomain(VoucherUsageJpaEntity jpaEntity) {
        if (jpaEntity == null) return null;
        VoucherUsage domain = new VoucherUsage();
        domain.setId(jpaEntity.getId());
        domain.setUsedAt(jpaEntity.getUsedAt());
        domain.setUser(userJpaEntityMapping.toDomain(jpaEntity.getUserJpaEntity()));
        domain.setVoucher(voucherJpaEntityMapping.toDomain(jpaEntity.getVoucherJpaEntity()));
        return domain;
    }

    public VoucherUsageJpaEntity toJpaEntity(VoucherUsage domain) {
        if (domain == null) return null;
        VoucherUsageJpaEntity jpaEntity = new VoucherUsageJpaEntity();
        jpaEntity.setId(domain.getId());
        jpaEntity.setUsedAt(domain.getUsedAt());
        jpaEntity.setUserJpaEntity(userJpaEntityMapping.toJpaEntity(domain.getUser()));
        jpaEntity.setVoucherJpaEntity(voucherJpaEntityMapping.toJpaEntity(domain.getVoucher()));
        return jpaEntity;
    }
}
