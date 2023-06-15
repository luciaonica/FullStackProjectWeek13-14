package com.genspark.clientprojectmanagement.DAO;

import com.genspark.clientprojectmanagement.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Integer> {
    Client findByName(String name);
}
