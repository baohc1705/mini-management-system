package com.baohc.minimanagementsystembe.application.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VoucherUsageResponse {
    private Long id;
    private LocalDateTime usedAt;
    private Long userId;
    private String userFullName;
    private Long voucherId;
    private String voucherCode;
}
