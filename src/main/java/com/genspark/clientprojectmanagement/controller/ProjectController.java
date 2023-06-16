package com.genspark.clientprojectmanagement.controller;

import com.genspark.clientprojectmanagement.entity.Project;
import com.genspark.clientprojectmanagement.entity.ProjectStatus;
import com.genspark.clientprojectmanagement.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping("/projects")
    public Project saveProject(@RequestBody Project project) {

        return projectService.saveProject(project);
    }

    @PutMapping("/projects")
    public Project updateProject(@RequestBody Project project) {

        return projectService.updateProject(project);
    }

    @PostMapping("/projects/check_name")
    public String checkDuplicateProjectName(Integer id, String name) {
        if (projectService.isNameUnique(id, name)) {
            return "Ok";
        } else {
            return "Duplicated";
        }
    }

    @GetMapping("/projects")
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/projects/{projectId}")
    public Project getProjectById(@PathVariable String projectId) {
        return projectService.getProjectById(Integer.parseInt(projectId));
    }

    @GetMapping("/projects/{projectId}/update_status/{status}")
    public String updateProjectStatus(@PathVariable(name="projectId") String projectId, @PathVariable(name="status") ProjectStatus status) {
        projectService.updateProjectStatus(Integer.parseInt(projectId), status);
        return "Status updated";
    }

}
