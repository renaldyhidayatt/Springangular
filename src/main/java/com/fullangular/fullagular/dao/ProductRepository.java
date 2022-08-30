package com.fullangular.fullagular.dao;

import com.fullangular.fullagular.entity.Customer;
import com.fullangular.fullagular.entity.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);

    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);

    @RepositoryRestResource
    interface StateRepository extends JpaRepository<Customer.State, Integer> {
        List<Customer.State> findByCountryCode(@Param("code") String code);
    }
}
