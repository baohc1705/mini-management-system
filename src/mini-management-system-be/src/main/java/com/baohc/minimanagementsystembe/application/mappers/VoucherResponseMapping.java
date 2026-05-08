package com.baohc.minimanagementsystembe.application.mappers;

import com.baohc.minimanagementsystembe.application.dtos.request.CreateVoucherRequest;
import com.baohc.minimanagementsystembe.application.dtos.request.UpdateVoucherRequest;
import com.baohc.minimanagementsystembe.application.dtos.response.VoucherResponse;
import com.baohc.minimanagementsystembe.domain.entities.Voucher;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
public class VoucherResponseMapping {
    public VoucherResponse toResponse(Voucher voucher) {
        var voucherResponse = new VoucherResponse();
        voucherResponse.setId(voucher.getId());
        voucherResponse.setCode(voucher.getCode());
        voucherResponse.setDiscountPercent(voucher.getDiscountPercent());
        voucherResponse.setQuantity(voucher.getQuantity());
        voucherResponse.setExpiredDate(voucher.getExpiredDate());
        voucherResponse.setStatus(voucher.getStatus());
        voucherResponse.setCreatedAt(voucher.getCreatedAt());
        return voucherResponse;
    }

    public Voucher create(CreateVoucherRequest request) {
        var voucher = new Voucher();
        voucher.setCode(request.getCode());
        voucher.setDiscountPercent(request.getDiscountPercent());
        voucher.setQuantity(request.getQuantity());
        voucher.setExpiredDate(request.getExpiredDate());
        voucher.setStatus(com.baohc.minimanagementsystembe.domain.enums.VoucherStatus.ACTIVE);
        voucher.setCreatedAt(LocalDateTime.now());
        return voucher;
    }

    public Voucher update(Voucher voucher, UpdateVoucherRequest request) {
        voucher.setDiscountPercent(request.getDiscountPercent());
        voucher.setQuantity(request.getQuantity());
        voucher.setExpiredDate(request.getExpiredDate());
        return voucher;
    }
}
