package com.baohc.minimanagementsystembe.application.services;

import com.baohc.minimanagementsystembe.application.dtos.request.CreateVoucherRequest;
import com.baohc.minimanagementsystembe.application.dtos.request.UpdateVoucherRequest;
import com.baohc.minimanagementsystembe.application.dtos.response.PageResponse;
import com.baohc.minimanagementsystembe.application.dtos.response.VoucherResponse;
import com.baohc.minimanagementsystembe.application.interfaces.VoucherService;
import com.baohc.minimanagementsystembe.application.mappers.VoucherResponseMapping;
import com.baohc.minimanagementsystembe.domain.exceptions.AppException;
import com.baohc.minimanagementsystembe.domain.exceptions.ErrorCode;
import com.baohc.minimanagementsystembe.domain.repositories.VoucherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
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
    public PageResponse<VoucherResponse> findAllPaginated(int page, int size) {
        var pageable = PageRequest.of(page - 1, size);
        var voucherPage = voucherRepository.findAll(pageable);

        var items = voucherPage.getContent().stream()
                .map(voucherResponseMapping::toResponse)
                .toList();

        return PageResponse.of(items, page, size, voucherPage.getTotalElements());
    }

    @Override
    public VoucherResponse save(CreateVoucherRequest request) {
        validateCreateRequest(request);
        var voucher = voucherRepository.save(voucherResponseMapping.create(request));
        return voucherResponseMapping.toResponse(voucher);
    }

    @Override
    public void delete(Long id) {
        voucherRepository.delete(id);
    }

    @Override
    public void update(UpdateVoucherRequest request) {
        validateUpdateRequest(request);
        var voucher = voucherResponseMapping.update(voucherRepository.findById(request.getId()), request);
        voucherRepository.update(voucher);
    }

    private void validateCreateRequest(CreateVoucherRequest request) {
        if (voucherRepository.existsByCode(request.getCode())) {
            throw new AppException(ErrorCode.VOUCHER_ALREADY_EXISTS);
        }
        validateExpiredDate(request.getExpiredDate());
    }

    private void validateUpdateRequest(UpdateVoucherRequest request) {
        validateExpiredDate(request.getExpiredDate());
    }

    private void validateExpiredDate(LocalDate expiredDate) {
        if (expiredDate == null || expiredDate.isBefore(LocalDate.now())) {
            throw new AppException(ErrorCode.INVALID_EXPIRED_DATE);
        }
    }
}
