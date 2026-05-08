package com.baohc.minimanagementsystembe.domain.repositories;

import com.baohc.minimanagementsystembe.domain.entities.User;

import java.util.List;

public interface UserRepository {
    User findById(Long id);
    List<User> findAll();
    User save(User user);
    void update(User user);
}
