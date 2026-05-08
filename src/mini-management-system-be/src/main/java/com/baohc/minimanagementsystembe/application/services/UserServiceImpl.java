package com.baohc.minimanagementsystembe.application.services;

import com.baohc.minimanagementsystembe.application.dtos.request.CreateUserRequest;
import com.baohc.minimanagementsystembe.application.dtos.request.UpdateUserRequest;
import com.baohc.minimanagementsystembe.application.dtos.response.PageResponse;
import com.baohc.minimanagementsystembe.application.dtos.response.UserResponse;
import com.baohc.minimanagementsystembe.application.interfaces.UserService;
import com.baohc.minimanagementsystembe.application.mappers.UserResponseMapping;
import com.baohc.minimanagementsystembe.domain.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserResponseMapping userResponseMapping;

    @Override
    public UserResponse findById(Long id) {
        var user = userRepository.findById(id);
        return userResponseMapping.toResponse(user);
    }

    @Override
    public List<UserResponse> findAll() {
        return userRepository.findAll().stream()
                .map(userResponseMapping::toResponse)
                .toList();
    }

    @Override
    public PageResponse<UserResponse> findAllPaginated(int page, int size) {
        var pageable = PageRequest.of(page - 1, size);
        var userPage = userRepository.findAll(pageable);

        var items = userPage.getContent().stream()
                .map(userResponseMapping::toResponse)
                .toList();

        return PageResponse.of(items, page, size, userPage.getTotalElements());
    }

    @Override
    public UserResponse save(CreateUserRequest request) {
        var user = userRepository.save(userResponseMapping.create(request));
        return userResponseMapping.toResponse(user);
    }

    @Override
    public void update(UpdateUserRequest request) {
        var user = userResponseMapping.update(userRepository.findById(request.getId()), request);
        userRepository.update(user);
    }

    @Override
    public void delete(Long id) {
        userRepository.delete(id);
    }
}
