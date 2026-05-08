package com.baohc.minimanagementsystembe.application.mappers;

import com.baohc.minimanagementsystembe.application.dtos.response.VoucherUsageResponse;
import com.baohc.minimanagementsystembe.domain.entities.VoucherUsage;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class VoucherUsageResponseMapping {
    public VoucherUsageResponse toResponse(VoucherUsage usage) {
        if (usage == null) {
            return null;
        }
        return VoucherUsageResponse.builder()
                .id(usage.getId())
                .usedAt(usage.getUsedAt())
                .userId(usage.getUser() != null ? usage.getUser().getId() : null)
                .userFullName(usage.getUser() != null ? usage.getUser().getFullName() : null)
                .voucherId(usage.getVoucher() != null ? usage.getVoucher().getId() : null)
                .voucherCode(usage.getVoucher() != null ? usage.getVoucher().getCode() : null)
                .build();
    }
}
