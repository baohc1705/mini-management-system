package com.baohc.minimanagementsystembe.domain.entities;

import java.time.LocalDateTime;

public class VoucherUsage {
    private Long id;
    private LocalDateTime usedAt;

    private User user;
    private Voucher voucher;

    public VoucherUsage() {
    }

    public VoucherUsage(Long id,LocalDateTime usedAt) {
        this.id = id;
        this.usedAt = usedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getUsedAt() {
        return usedAt;
    }

    public void setUsedAt(LocalDateTime usedAt) {
        this.usedAt = usedAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Voucher getVoucher() {
        return voucher;
    }

    public void setVoucher(Voucher voucher) {
        this.voucher = voucher;
    }
}
