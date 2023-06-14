package com.genspark.clientprojectmanagement.entity;

import jakarta.persistence.*;

import java.util.Date;


@Entity
@Table(name = "clients")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int clientId;

    @Column(length = 45, nullable = false, unique = true)
    private String name;

    @Column(length = 64, nullable = false)
    private String address;

    @Column(length = 45, nullable = false)
    private String email;

    //@OneToOne()
    @Column(length = 45, nullable = false)
    private String username;

    @Column(length = 255, nullable = false)
    private String agreement;

    private Date registerDate;

    public Client() {
    }

    public Client(String name, String address, String email, String username, String agreement, Date registerDate) {
        this.name = name;
        this.address = address;
        this.email = email;
        this.username = username;
        this.agreement = agreement;
        this.registerDate = registerDate;
    }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAgreement() {
        return agreement;
    }

    public void setAgreement(String agreement) {
        this.agreement = agreement;
    }

    public Date getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(Date registerDate) {
        this.registerDate = registerDate;
    }
}
