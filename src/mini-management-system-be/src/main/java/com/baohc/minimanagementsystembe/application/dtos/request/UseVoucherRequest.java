package com.baohc.minimanagementsystembe.application.dtos.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UseVoucherRequest {
    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Voucher ID is required")
    private Long voucherId;
}
