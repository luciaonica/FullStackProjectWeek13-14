package com.genspark.clientprojectmanagement.service;

import com.genspark.clientprojectmanagement.entity.Client;
import com.genspark.clientprojectmanagement.entity.Project;
import com.genspark.clientprojectmanagement.entity.ProjectStatus;

import java.util.List;

public interface ProjectService {
    List<Project> getProjectsByClientId(int clientId);

    Project saveProject(Project project);

    Project updateProject(Project project);

    boolean isNameUnique(Integer id, String name);

    List<Project> getAllProjects();

    Project getProjectById(int i);
}
