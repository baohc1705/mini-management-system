package com.baohc.minimanagementsystembe.presentation.controllers;

import com.baohc.minimanagementsystembe.application.dtos.request.UseVoucherRequest;
import com.baohc.minimanagementsystembe.application.dtos.response.PageResponse;
import com.baohc.minimanagementsystembe.application.dtos.response.VoucherUsageResponse;
import com.baohc.minimanagementsystembe.application.interfaces.VoucherUsageService;
import com.baohc.minimanagementsystembe.presentation.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/voucher-usages")
@RequiredArgsConstructor
public class VoucherUsageController {
    private final VoucherUsageService voucherUsageService;

    @PostMapping("/use")
    public ApiResponse<VoucherUsageResponse> useVoucher(@Valid @RequestBody UseVoucherRequest request) {
        return ApiResponse.success("Voucher used successfully", voucherUsageService.useVoucher(request));
    }

    @GetMapping
    public ApiResponse<List<VoucherUsageResponse>> findAll() {
        return ApiResponse.success("Get voucher usages successfully", voucherUsageService.findAll());
    }

    @GetMapping("/page")
    public ApiResponse<PageResponse<VoucherUsageResponse>> findAllPaginated(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ApiResponse.success("Get paginated voucher usages successfully", voucherUsageService.findAllPaginated(page, size));
    }
}
