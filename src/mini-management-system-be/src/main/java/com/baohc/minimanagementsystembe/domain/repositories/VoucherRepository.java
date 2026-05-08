package com.baohc.minimanagementsystembe.domain.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.baohc.minimanagementsystembe.domain.entities.Voucher;

import java.util.List;

public interface VoucherRepository {
    Voucher findById(Long id);
    Voucher findByCode(String code);
    List<Voucher> findAll();
    Page<Voucher> findAll(Pageable pageable);
    Voucher save(Voucher user);
    void delete(Long id);
    void update(Voucher user);
    boolean existsByCode(String code);
    long count();
}
