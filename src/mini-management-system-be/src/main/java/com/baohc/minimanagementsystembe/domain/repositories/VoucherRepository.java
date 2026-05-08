package com.baohc.minimanagementsystembe.domain.repositories;

import com.baohc.minimanagementsystembe.domain.entities.Voucher;

import java.util.List;

public interface VoucherRepository {
    Voucher findById(Long id);
    Voucher findByCode(String code);
    List<Voucher> findAll();
    Voucher save(Voucher user);
    void delete(Long id);
    void update(Voucher user);
}
