package com.baohc.minimanagementsystembe.infrastructure.persistence.mappers;

import com.baohc.minimanagementsystembe.domain.entities.VoucherUsage;
import org.springframework.stereotype.Component;

@Component
public class VoucherUsageJpaEntityMapping {
    public VoucherUsage toDomain(VoucherUsage voucherUsage) {
        VoucherUsage voucherUsageDomain = new VoucherUsage();
        voucherUsageDomain.setId(voucherUsage.getId());
        voucherUsageDomain.setUsedAt(voucherUsage.getUsedAt());
        voucherUsageDomain.setVoucher(voucherUsage.getVoucher());
        voucherUsageDomain.setUser(voucherUsage.getUser());
        return voucherUsageDomain;
    }
}
