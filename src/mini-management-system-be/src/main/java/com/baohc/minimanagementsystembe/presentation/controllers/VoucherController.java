package com.baohc.minimanagementsystembe.presentation.controllers;

import com.baohc.minimanagementsystembe.application.dtos.request.CreateVoucherRequest;
import com.baohc.minimanagementsystembe.application.dtos.request.UpdateVoucherRequest;
import com.baohc.minimanagementsystembe.application.dtos.response.VoucherResponse;
import com.baohc.minimanagementsystembe.application.interfaces.VoucherService;
import com.baohc.minimanagementsystembe.presentation.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vouchers")
@RequiredArgsConstructor
public class VoucherController {
    private final VoucherService voucherService;

    @GetMapping
    public ApiResponse<List<VoucherResponse>> findAll(){
        return ApiResponse.success("Get vouchers successfully", voucherService.findAll());
    }

    @PostMapping
    public ApiResponse<VoucherResponse> save(@RequestBody CreateVoucherRequest request){
        return ApiResponse.success("Create voucher successfully", voucherService.save(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<String> update(@RequestBody UpdateVoucherRequest request, @PathVariable Long id){
        voucherService.update(request);
        return ApiResponse.success("Update voucher successfully", null);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(@PathVariable Long id){
        voucherService.delete(id);
        return ApiResponse.success("Delete voucher successfully", null);
    }

    @GetMapping("/search")
    public ResponseEntity<VoucherResponse> findByCode(@RequestParam String code){
        return ResponseEntity.ok(voucherService.findByCode(code));
    }

}
