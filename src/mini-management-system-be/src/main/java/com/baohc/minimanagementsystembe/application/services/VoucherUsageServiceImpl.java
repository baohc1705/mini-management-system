package com.baohc.minimanagementsystembe.application.services;

import com.baohc.minimanagementsystembe.application.dtos.request.UseVoucherRequest;
import com.baohc.minimanagementsystembe.application.dtos.response.PageResponse;
import com.baohc.minimanagementsystembe.application.dtos.response.VoucherUsageResponse;
import com.baohc.minimanagementsystembe.application.interfaces.VoucherUsageService;
import com.baohc.minimanagementsystembe.application.mappers.VoucherUsageResponseMapping;
import com.baohc.minimanagementsystembe.domain.entities.VoucherUsage;
import com.baohc.minimanagementsystembe.domain.exceptions.AppException;
import com.baohc.minimanagementsystembe.domain.exceptions.ErrorCode;
import com.baohc.minimanagementsystembe.domain.repositories.UserRepository;
import com.baohc.minimanagementsystembe.domain.repositories.VoucherRepository;
import com.baohc.minimanagementsystembe.domain.repositories.VoucherUsageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class VoucherUsageServiceImpl implements VoucherUsageService {
    private final VoucherUsageRepository voucherUsageRepository;
    private final VoucherRepository voucherRepository;
    private final UserRepository userRepository;
    private final VoucherUsageResponseMapping voucherUsageResponseMapping;

    @Override
    public VoucherUsageResponse useVoucher(UseVoucherRequest request) {
        var user = userRepository.findById(request.getUserId());
        var voucher = voucherRepository.findById(request.getVoucherId());

        // Validation
        if (!voucher.isActive()) {
            throw new AppException(ErrorCode.VOUCHER_INACTIVE);
        }
        if (voucher.isExpired()) {
            throw new AppException(ErrorCode.VOUCHER_EXPIRED);
        }
        if (voucher.getQuantity() <= 0) {
            throw new AppException(ErrorCode.VOUCHER_OUT_OF_STOCK);
        }

        // Use voucher
        voucher.use();
        voucherRepository.update(voucher);

        // Save usage history
        var usage = new VoucherUsage();
        usage.setUser(user);
        usage.setVoucher(voucher);
        usage.setUsedAt(LocalDateTime.now());
        
        var savedUsage = voucherUsageRepository.save(usage);
        
        return voucherUsageResponseMapping.toResponse(savedUsage);
    }

    @Override
    public List<VoucherUsageResponse> findAll() {
        return voucherUsageRepository.findAll().stream()
                .map(voucherUsageResponseMapping::toResponse)
                .toList();
    }

    @Override
    public PageResponse<VoucherUsageResponse> findAllPaginated(int page, int size) {
        var pageable = PageRequest.of(page - 1, size);
        var usagePage = voucherUsageRepository.findAll(pageable);

        var items = usagePage.getContent().stream()
                .map(voucherUsageResponseMapping::toResponse)
                .toList();

        return PageResponse.of(items, page, size, usagePage.getTotalElements());
    }
}
