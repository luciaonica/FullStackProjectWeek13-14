package com.genspark.clientprojectmanagement.DAO;

import com.genspark.clientprojectmanagement.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ClientRepository extends JpaRepository<Client, Integer> {
    Client findByName(String name);

    @Query("select c from Client c where c.username = ?1")
    Client findByUsername(String username);

    @Modifying
    @Query(value = "update clients set number_of_projects = (\n" +
            "    SELECT COUNT(*) \n" +
            "    FROM projects\n" +
            "    WHERE projects.client_id = clients.client_id\n" +
            ")", nativeQuery = true)
    void updateNumberOfProjects();
}
