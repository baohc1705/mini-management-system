package com.baohc.minimanagementsystembe.domain.entities;

import java.time.LocalDateTime;
import java.util.List;

public class User {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private LocalDateTime createdAt;

    private List<VoucherUsage> voucherUsages;

    public User() {
    }

    public User(Long id, String fullName, String email, String phone, LocalDateTime createdAt) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public  static  User create(String fullName, String email, String phone) {
        return new User(null, fullName, email, phone, LocalDateTime.now());
    }

    public void update(String fullName, String email, String phone) {
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
    }

    public List<VoucherUsage> getVoucherUsages() {
        return voucherUsages;
    }

    public void setVoucherUsages(List<VoucherUsage> voucherUsages) {
        this.voucherUsages = voucherUsages;
    }
}
