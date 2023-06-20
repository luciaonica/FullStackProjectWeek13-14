package com.genspark.clientprojectmanagement.controller;

import com.genspark.clientprojectmanagement.entity.Client;
import com.genspark.clientprojectmanagement.entity.Project;
import com.genspark.clientprojectmanagement.service.ClientService;
import com.genspark.clientprojectmanagement.service.FileUploadUtil;
import com.genspark.clientprojectmanagement.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class ClientController {
    @Autowired
    private ClientService clientService;

    @Autowired
    private ProjectService projectService;

    @PostMapping("/clients")
    public Client saveClient(@RequestBody Client client) {

        return clientService.saveClient(client);
    }

    @PutMapping("/clients")
    public Client updateClient(@RequestBody Client client) {
        System.out.println(client.getClientId());
        return clientService.updateClient(client);
    }

    @PostMapping("clients/upload/{clientId}")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @PathVariable String clientId) throws IOException {
        //int clientId = 1;

        Client client = clientService.getClientById(Integer.parseInt(clientId));

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        client.setAgreement(fileName);
        clientService.saveClient(client);
        String uploadDir = "client-agreement/" + clientId;

        FileUploadUtil.cleanDir(uploadDir);
        FileUploadUtil.saveFile(uploadDir, fileName, file);

        return ResponseEntity.ok("File uploaded successfully");
    }

    @PostMapping("/clients/check_name")
    public String checkDuplicateClientName(Integer id, String name) {
        if (clientService.isNameUnique(id, name)) {
            return "Ok";
        } else {
            return "Duplicated";
        }
    }

    @GetMapping("/clients")
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    @GetMapping("/clients/{clientId}")
    public Client getClientById(@PathVariable String clientId) {
        return clientService.getClientById(Integer.parseInt(clientId));
    }

    @GetMapping("/clients/projects/{clientId}")
    public List<Project> getProjectsByClientId(@PathVariable int clientId) {
        return projectService.getProjectsByClientId(clientId);
    }

    @GetMapping("/clients/client_by_username/{username}")
    public Client getClientByUsername(@PathVariable String username) {
        return clientService.getClientByUsername(username);
    }

}
