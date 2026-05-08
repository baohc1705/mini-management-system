package com.baohc.minimanagementsystembe.infrastructure.persistence.entities;

import com.baohc.minimanagementsystembe.domain.entities.User;
import com.baohc.minimanagementsystembe.domain.entities.Voucher;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "voucher_usages")
public class VoucherUsageJpaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime usedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserJpaEntity userJpaEntity;

    @ManyToOne
    @JoinColumn(name = "voucher_id")
    private VoucherJpaEntity voucherJpaEntity;
}
