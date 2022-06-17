package com.fullangular.fullagular.dao;

import com.fullangular.fullagular.entity.Customer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    
}