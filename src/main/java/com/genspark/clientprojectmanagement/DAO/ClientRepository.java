package com.genspark.clientprojectmanagement.DAO;

import com.genspark.clientprojectmanagement.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ClientRepository extends JpaRepository<Client, Integer> {
    Client findByName(String name);

    @Query("select c from Client c where c.username = ?1")
    Client findByUsername(String username);
}
