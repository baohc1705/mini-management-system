package com.baohc.minimanagementsystembe.application.services;

import com.baohc.minimanagementsystembe.application.dtos.request.CreateVoucherRequest;
import com.baohc.minimanagementsystembe.application.dtos.request.UpdateVoucherRequest;
import com.baohc.minimanagementsystembe.application.dtos.response.VoucherResponse;
import com.baohc.minimanagementsystembe.application.interfaces.VoucherService;
import com.baohc.minimanagementsystembe.application.mappers.VoucherResponseMapping;
import com.baohc.minimanagementsystembe.domain.entities.Voucher;
import com.baohc.minimanagementsystembe.domain.repositories.VoucherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
@Service
@RequiredArgsConstructor
public class VoucherServiceImpl implements VoucherService {
    private final VoucherRepository voucherRepository;
    private final VoucherResponseMapping voucherResponseMapping;

    @Override
    public VoucherResponse findById(Long id) {
        var voucher = voucherRepository.findById(id);
        return voucherResponseMapping.toResponse(voucher);
    }

    @Override
    public VoucherResponse findByCode(String code) {
        var voucher = voucherRepository.findByCode(code);
        return voucherResponseMapping.toResponse(voucher);
    }

    @Override
    public List<VoucherResponse> findAll() {
        return voucherRepository.findAll().stream()
                .map(voucherResponseMapping::toResponse)
                .toList();
    }

    @Override
    public VoucherResponse save(CreateVoucherRequest request) {
        //validateCreateRequest(request);
        var voucher = voucherRepository.save(voucherResponseMapping.create(request));
        return voucherResponseMapping.toResponse(voucher);
    }

    @Override
    public void delete(Long id) {
        voucherRepository.delete(id);
    }

    @Override
    public void update(UpdateVoucherRequest request) {
        var voucher = voucherResponseMapping.update(voucherRepository.findById(request.getId()), request);
        voucherRepository.update(voucher);
    }

//    private boolean validateCreateRequest(CreateVoucherRequest request) {
//        boolean isValid = true;
//        try {
//            var voucher = voucherRepository.findByCode(request.getCode());
//            if (voucher != null)
//                isValid = false;
//        } catch (Exception e) {
//            throw new RuntimeException("Voucher code already exists");
//        }
//
//        if (request.getDiscountPercent() < 1 || request.getDiscountPercent() > 100)
//            throw new RuntimeException("Discount percent must be between 1 and 100");
//        if (request.getQuantity() < 0)
//            throw new RuntimeException("Quantity must be greater than 0");
//        if (request.getExpiredDate().isBefore(LocalDate.now()))
//            throw new RuntimeException("Expired date must be greater than today");
//        return isValid;
//    }
}
