package com.baohc.minimanagementsystembe.presentation.controllers;

import com.baohc.minimanagementsystembe.application.dtos.request.CreateVoucherRequest;
import com.baohc.minimanagementsystembe.application.dtos.request.UpdateVoucherRequest;
import com.baohc.minimanagementsystembe.application.dtos.response.PageResponse;
import com.baohc.minimanagementsystembe.application.dtos.response.VoucherResponse;
import com.baohc.minimanagementsystembe.application.interfaces.VoucherService;
import com.baohc.minimanagementsystembe.presentation.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vouchers")
@RequiredArgsConstructor
public class VoucherController {
    private final VoucherService voucherService;

    @GetMapping
    public ApiResponse<List<VoucherResponse>> findAll() {
        return ApiResponse.success("Get vouchers successfully", voucherService.findAll());
    }

    @GetMapping("/page")
    public ApiResponse<PageResponse<VoucherResponse>> findAllPaginated(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ApiResponse.success("Get paginated vouchers successfully", voucherService.findAllPaginated(page, size));
    }

    @PostMapping
    public ApiResponse<VoucherResponse> save(@Valid @RequestBody CreateVoucherRequest request) {
        return ApiResponse.success("Create voucher successfully", voucherService.save(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<String> update(@Valid @RequestBody UpdateVoucherRequest request, @PathVariable Long id) {
        voucherService.update(request);
        return ApiResponse.success("Update voucher successfully", null);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(@PathVariable Long id) {
        voucherService.delete(id);
        return ApiResponse.success("Delete voucher successfully", null);
    }

    @GetMapping("/search")
    public ApiResponse<VoucherResponse> findByCode(@RequestParam String code) {
        return ApiResponse.success("Get voucher by code successfully", voucherService.findByCode(code));
    }

}
