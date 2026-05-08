package com.baohc.minimanagementsystembe.domain.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GenericRepository<T, ID> {
    T findById(ID id);
    List<T> findAll();
    Page<T> findAll(Pageable pageable);
    T save(T entity);
    void update(T entity);
    void delete(ID id);
    long count();
}
