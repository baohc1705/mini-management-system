package com.baohc.minimanagementsystembe.application.interfaces;

import com.baohc.minimanagementsystembe.application.dtos.request.CreateVoucherRequest;
import com.baohc.minimanagementsystembe.application.dtos.request.UpdateVoucherRequest;
import com.baohc.minimanagementsystembe.application.dtos.response.PageResponse;
import com.baohc.minimanagementsystembe.application.dtos.response.VoucherResponse;

import java.util.List;

public interface VoucherService {
    VoucherResponse findById(Long id);

    VoucherResponse findByCode(String code);

    List<VoucherResponse> findAll();

    PageResponse<VoucherResponse> findAllPaginated(int page, int size);

    VoucherResponse save(CreateVoucherRequest request);

    void delete(Long id);

    void update(UpdateVoucherRequest request);
}
