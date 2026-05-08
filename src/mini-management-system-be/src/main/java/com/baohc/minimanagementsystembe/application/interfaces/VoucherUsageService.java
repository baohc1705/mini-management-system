package com.baohc.minimanagementsystembe.application.interfaces;

import com.baohc.minimanagementsystembe.application.dtos.request.UseVoucherRequest;
import com.baohc.minimanagementsystembe.application.dtos.response.PageResponse;
import com.baohc.minimanagementsystembe.application.dtos.response.VoucherUsageResponse;

import java.util.List;

public interface VoucherUsageService {
    VoucherUsageResponse useVoucher(UseVoucherRequest request);
    List<VoucherUsageResponse> findAll();
    PageResponse<VoucherUsageResponse> findAllPaginated(int page, int size);
}
