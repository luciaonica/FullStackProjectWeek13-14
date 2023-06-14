package com.genspark.clientprojectmanagement.DAO;

import com.genspark.clientprojectmanagement.entity.Client;
import com.genspark.clientprojectmanagement.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
    @Query("select p from Project p where p.client.clientId= ?1")
    List<Project> findByClientId(int clientId);

    Project findByName(String name);
}
