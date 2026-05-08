package com.baohc.minimanagementsystembe.application.interfaces;

import com.baohc.minimanagementsystembe.application.dtos.request.CreateUserRequest;
import com.baohc.minimanagementsystembe.application.dtos.request.UpdateUserRequest;
import com.baohc.minimanagementsystembe.application.dtos.response.PageResponse;
import com.baohc.minimanagementsystembe.application.dtos.response.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse findById(Long id);
    List<UserResponse> findAll();
    PageResponse<UserResponse> findAllPaginated(int page, int size);
    UserResponse save(CreateUserRequest request);
    void update(UpdateUserRequest request);
    void delete(Long id);
}
