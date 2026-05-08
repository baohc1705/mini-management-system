package com.baohc.minimanagementsystembe.application.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CreateVoucherRequest {
    private String code;
    private Integer discountPercent;
    private Integer quantity;
    private LocalDate expiredDate;
}
