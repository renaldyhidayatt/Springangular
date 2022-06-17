package com.fullangular.fullagular.entity;

import com.fullangular.fullagular.dao.Country;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "countries", path = "countries")
public interface CountryRespository extends JpaRepository<Country, Integer> {

}
