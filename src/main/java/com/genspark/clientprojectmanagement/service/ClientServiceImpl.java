package com.genspark.clientprojectmanagement.service;

import com.genspark.clientprojectmanagement.DAO.ClientRepository;
import com.genspark.clientprojectmanagement.entity.Client;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ClientServiceImpl implements ClientService{

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public Client getClientById(int clientId) {
        Optional<Client> c = clientRepository.findById(clientId);
        Client client = null;
        if (c.isPresent()){
            client = c.get();
        } else {
            throw new RuntimeException("Client ID " + clientId + " not found");
        }
        return client;
    }

    @Override
    public Client saveClient(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public Client updateClient(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    @Override
    public boolean isNameUnique(Integer id, String name) {

        Client existClient = clientRepository.findByName(name);
        if(existClient != null && existClient.getClientId() != id){
            return false;
        }
        return true;
    }

    @Override
    public Client getClientByUsername(String username) {
        Client client = clientRepository.findByUsername(username);
        return client;
    }

    @Override
    public void updateNumberOfProjects() {
        clientRepository.updateNumberOfProjects();
    }
}
