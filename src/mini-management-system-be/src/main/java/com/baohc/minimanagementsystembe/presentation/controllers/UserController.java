package com.baohc.minimanagementsystembe.presentation.controllers;

import com.baohc.minimanagementsystembe.application.dtos.request.CreateUserRequest;
import com.baohc.minimanagementsystembe.application.dtos.request.UpdateUserRequest;
import com.baohc.minimanagementsystembe.application.dtos.response.PageResponse;
import com.baohc.minimanagementsystembe.application.dtos.response.UserResponse;
import com.baohc.minimanagementsystembe.application.interfaces.UserService;
import com.baohc.minimanagementsystembe.presentation.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ApiResponse<List<UserResponse>> findAll() {
        return ApiResponse.success("Get users successfully", userService.findAll());
    }

    @GetMapping("/page")
    public ApiResponse<PageResponse<UserResponse>> findAllPaginated(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ApiResponse.success("Get paginated users successfully", userService.findAllPaginated(page, size));
    }

    @GetMapping("/{id}")
    public ApiResponse<UserResponse> findById(@PathVariable Long id) {
        return ApiResponse.success("Get user by id successfully", userService.findById(id));
    }

    @PostMapping
    public ApiResponse<UserResponse> save(@Valid @RequestBody CreateUserRequest request) {
        return ApiResponse.success("Create user successfully", userService.save(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<String> update(@Valid @RequestBody UpdateUserRequest request, @PathVariable Long id) {
        request.setId(id);
        userService.update(request);
        return ApiResponse.success("Update user successfully", null);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(@PathVariable Long id) {
        userService.delete(id);
        return ApiResponse.success("Delete user successfully", null);
    }
}
