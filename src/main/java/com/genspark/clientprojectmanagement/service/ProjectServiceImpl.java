package com.genspark.clientprojectmanagement.service;

import com.genspark.clientprojectmanagement.DAO.ProjectRepository;
import com.genspark.clientprojectmanagement.entity.Client;
import com.genspark.clientprojectmanagement.entity.Project;
import com.genspark.clientprojectmanagement.entity.ProjectStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProjectServiceImpl implements ProjectService{

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public List<Project> getProjectsByClientId(int clientId) {
        return projectRepository.findByClientId(clientId);
    }

    @Override
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public Project updateProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public boolean isNameUnique(Integer id, String name) {
        Project existProject = projectRepository.findByName(name);
        if(existProject != null && existProject.getProjectId() != id){
            return false;
        }
        return true;
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public Project getProjectById(int id) {
        Optional<Project> p = projectRepository.findById(id);
        Project project = null;
        if (p.isPresent()){
            project = p.get();
        } else {
            throw new RuntimeException("Project ID " + id + " not found");
        }
        return project;
    }

    @Override
    public void updateProjectStatus(Integer id, ProjectStatus status) {
        Project project = projectRepository.findById(id).get();
        project.setStatus(status);
        if (status.equals(ProjectStatus.CANCELLED) || status.equals(ProjectStatus.COMPLETED)) {
            project.setEndDate(new Date());
        }
        projectRepository.save(project);
    }
}
