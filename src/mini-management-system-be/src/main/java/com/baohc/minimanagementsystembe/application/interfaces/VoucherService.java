package com.baohc.minimanagementsystembe.application.interfaces;

import com.baohc.minimanagementsystembe.application.dtos.request.CreateVoucherRequest;
import com.baohc.minimanagementsystembe.application.dtos.request.UpdateVoucherRequest;
import com.baohc.minimanagementsystembe.application.dtos.response.VoucherResponse;
import com.baohc.minimanagementsystembe.domain.entities.Voucher;

import java.util.List;

public interface VoucherService {
    VoucherResponse findById(Long id);
    VoucherResponse findByCode(String code);
    List<VoucherResponse> findAll();
    VoucherResponse save(CreateVoucherRequest request);
    void delete(Long id);
    void update(UpdateVoucherRequest request);
}
