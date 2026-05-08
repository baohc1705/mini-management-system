package com.baohc.minimanagementsystembe.application.dtos.response;

import com.baohc.minimanagementsystembe.domain.enums.VoucherStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class VoucherResponse {
    private Long id;
    private String code;
    private Integer discountPercent;
    private Integer quantity;
    private LocalDate expiredDate;
    private VoucherStatus status;
    private LocalDateTime createdAt;
}
