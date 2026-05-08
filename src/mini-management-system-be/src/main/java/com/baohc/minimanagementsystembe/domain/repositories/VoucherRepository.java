package com.baohc.minimanagementsystembe.domain.repositories;

import com.baohc.minimanagementsystembe.domain.entities.Voucher;

public interface VoucherRepository extends GenericRepository<Voucher, Long> {
    Voucher findByCode(String code);
    boolean existsByCode(String code);
}
