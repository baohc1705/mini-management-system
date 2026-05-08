package com.baohc.minimanagementsystembe.infrastructure.persistence.entities;

import com.baohc.minimanagementsystembe.domain.enums.VoucherStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "vouchers")
public class VoucherJpaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "discount_percent")
    private Integer discountPercent;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "expired_date")
    private LocalDate expiredDate;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private VoucherStatus status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "voucherJpaEntity")
    private List<VoucherUsageJpaEntity> voucherUsagesJpaEntity;
}
