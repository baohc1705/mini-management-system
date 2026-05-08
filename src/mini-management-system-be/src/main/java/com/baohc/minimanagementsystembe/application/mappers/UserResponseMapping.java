package com.baohc.minimanagementsystembe.application.mappers;

import com.baohc.minimanagementsystembe.application.dtos.request.CreateUserRequest;
import com.baohc.minimanagementsystembe.application.dtos.request.UpdateUserRequest;
import com.baohc.minimanagementsystembe.application.dtos.response.UserResponse;
import com.baohc.minimanagementsystembe.domain.entities.User;
import org.springframework.stereotype.Component;

@Component
public class UserResponseMapping {
    public UserResponse toResponse(User user) {
        if (user == null) {
            return null;
        }
        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .createdAt(user.getCreatedAt())
                .build();
    }

    public User create(CreateUserRequest request) {
        if (request == null) {
            return null;
        }
        return User.create(
                request.getFullName(),
                request.getEmail(),
                request.getPhone()
        );
    }

    public User update(User user, UpdateUserRequest request) {
        if (user == null || request == null) {
            return user;
        }
        user.update(
                request.getFullName(),
                request.getEmail(),
                request.getPhone()
        );
        return user;
    }
}
