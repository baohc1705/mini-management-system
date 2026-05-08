package com.baohc.minimanagementsystembe.domain.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    VOUCHER_ALREADY_EXISTS(400, "Voucher code already exists", HttpStatus.BAD_REQUEST),
    INVALID_EXPIRED_DATE(400, "Expired date must be today or in the future", HttpStatus.BAD_REQUEST),
    VOUCHER_NOT_FOUND(404, "Voucher not found", HttpStatus.NOT_FOUND),
    UNCATEGORIZED_EXCEPTION(999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    ;

    private final int code;
    private final String message;
    private final HttpStatus httpStatus;

    ErrorCode(int code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
