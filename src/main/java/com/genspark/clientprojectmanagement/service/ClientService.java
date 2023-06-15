package com.genspark.clientprojectmanagement.service;

import com.genspark.clientprojectmanagement.entity.Client;

import java.util.List;

public interface ClientService {
    Client getClientById(int clientId);

    boolean isNameUnique(Integer id, String name);

    Client saveClient(Client client);

    Client updateClient(Client client);

    List<Client> getAllClients();
}
