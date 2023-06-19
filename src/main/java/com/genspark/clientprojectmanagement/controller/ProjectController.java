package com.genspark.clientprojectmanagement.controller;

import com.genspark.clientprojectmanagement.entity.Client;
import com.genspark.clientprojectmanagement.entity.Project;
import com.genspark.clientprojectmanagement.entity.ProjectStatus;
import com.genspark.clientprojectmanagement.service.ClientService;
import com.genspark.clientprojectmanagement.service.ProjectService;
import com.genspark.clientprojectmanagement.service.MailSenderUtility;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private ClientService clientService;

    @PostMapping("/projects")
    public Project saveProject(@RequestBody Project project) {
        Project savedProject = projectService.saveProject(project);
        updateNumberOfProjects();
        return savedProject;
    }

    private void updateNumberOfProjects() {
        clientService.updateNumberOfProjects();
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
    public String updateProjectStatus(@PathVariable(name="projectId") String projectId, @PathVariable(name="status") ProjectStatus status,
                                      HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        projectService.updateProjectStatus(Integer.parseInt(projectId), status);
        sendEmail(request, 18, status.toString(), Integer.parseInt(projectId));
        return "Status updated";
    }

    public String sendEmail(HttpServletRequest request, @PathVariable(name="clientId") Integer id,
                            @PathVariable(name="status") String status, Integer projectId)
            throws MessagingException, UnsupportedEncodingException {
        Client client = clientService.getClientById(id);

        JavaMailSenderImpl mailSender = MailSenderUtility.prepareMailSender();

        String toAddress = client.getEmail();
        String subject = "hello";
        String content = "project ID " + projectId+ " has been " + status;

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        //helper.setFrom("tatiana56guzun@gmail.com", "Dev Team");
        helper.setTo(toAddress);
        helper.setSubject(subject);
        helper.setText(content);

        mailSender.send(message);

        return "Sent successfully";
    }


}
