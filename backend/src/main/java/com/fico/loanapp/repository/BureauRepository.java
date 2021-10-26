package com.fico.loanapp.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.fico.loanapp.model.*;
import org.springframework.stereotype.Repository;


/**
 * This interface implements CRUD functions and provides a method to find bureau data using sid/ssn.
 *
 * @param bureau data object and type of primary key
 **/

public interface BureauRepository extends JpaRepository<BureauData, Long> {

    BureauData findBysid(long sid);
}
