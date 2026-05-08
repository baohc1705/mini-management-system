package com.baohc.minimanagementsystembe.application.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.validation.constraints.*;

import java.time.LocalDate;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CreateVoucherRequest {
    @NotBlank(message = "Code is required")
    @Size(max = 50, message = "Code must be less than 50 characters")
    private String code;

    @NotNull(message = "Discount percent is required")
    @Min(value = 1, message = "Discount percent must be at least 1")
    @Max(value = 100, message = "Discount percent must be at most 100")
    private Integer discountPercent;

    @NotNull(message = "Quantity is required")
    @Min(value = 0, message = "Quantity must be 0 or greater")
    private Integer quantity;

    @NotNull(message = "Expired date is required")
    private LocalDate expiredDate;
}
