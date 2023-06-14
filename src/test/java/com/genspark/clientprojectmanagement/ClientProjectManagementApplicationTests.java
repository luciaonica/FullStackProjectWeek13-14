package com.genspark.clientprojectmanagement;

import com.genspark.clientprojectmanagement.DAO.RoleDao;
import com.genspark.clientprojectmanagement.DAO.RoleDaoImpl;
import com.genspark.clientprojectmanagement.DAO.UserDao;
import com.genspark.clientprojectmanagement.entity.Role;
import com.genspark.clientprojectmanagement.entity.User;
import com.genspark.clientprojectmanagement.service.UserInfoService;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.swing.text.html.parser.Entity;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ClientProjectManagementApplicationTests {

	@Autowired
	private UserDao userDao;

	@Autowired
	private RoleDao roleDao;

	@Autowired
	private UserInfoService userInfoService;

	@Autowired
	private EntityManager entityManager;

	@Test
	void correctFindRoleId1() {
		Role role = roleDao.findRoleByName("ROLE_DEVELOPER");
		assertTrue(role.getName().equals("ROLE_DEVELOPER"));
		assertEquals(role.getId(), 1);
	}

	@Test
	void correctFindRoleId2() {
		Role role = roleDao.findRoleByName("ROLE_CLIENT");
		assertTrue(role.getName().equals("ROLE_CLIENT"));
		assertEquals(role.getId(), 2);
	}

	@Test
	void incorrectFindRole(){
		Role role = roleDao.findRoleByName("ROLE_USER");
		assertNull(role);
	}

	@Test
	void correctFindUsername(){
		User user = userInfoService.findByUserName("dev");
		assertTrue(user.getUsername().equals("dev"));
		assertTrue(user.getPassword().equals("$2a$10$5W.UNBGR8V5fTt9fQyMUw.vP9q0K72zG5LsQD1bJ.ob7OZdp8EYza"));
		assertEquals(user.getRoles().size(),2);
	}

	@Test
	void incorrectFindUsername(){
		User user = userInfoService.findByUserName("unknown");
		assertNull(user);
	}
	@Test
	void saveAndDelete(){
		User user = new User();
		//user only expected to provide username and password
		user.setUsername("unit_test_save_01");
		user.setPassword("unit_test_save_01");
		User userReturned = userInfoService.saveUser(user);
		assertNotNull(userReturned);

		userInfoService.deleteByUsername("unit_test_save_01");
		userReturned = userInfoService.findByUserName(user.getUsername());
		assertNull(userReturned);
	}
	//test DOES NOT delete user created if an error happens halfway, have to delete it manually
	@Test
	void saveRetrieveAndDeleteCorrectUser(){
		User user = new User();
		//user only expected to provide username and password
		Random random = new Random();
		user.setUsername("unit_test_save" + random.nextInt(100));
		user.setPassword("unit_test_save");
		User userReturned = userInfoService.saveUser(user);
		assertNotNull(userReturned);

		userReturned = userInfoService.findByUserName(user.getUsername());
		assertTrue(userReturned.isEnabled());
		assertTrue(userReturned.getUsername().equals(user.getUsername()));
		assertTrue(userReturned.getPassword().equals(user.getPassword()));
		Iterator<Role> roleIterator = userReturned.getRoles().iterator();
		for(int i = 0; i < userReturned.getRoles().size(); i++){
			Role role = roleIterator.next();
			if(i == 0){
				assertEquals(role.getId(), 2);
				assertTrue(role.getName().equals("ROLE_CLIENT"));
			}
		}
		userInfoService.deleteByUsername(user.getUsername());
		userReturned = userInfoService.findByUserName(user.getUsername());
		assertNull(userReturned);
	}

	//test DOES NOT delete user created if an error happens halfway, have to delete it manually
	@Test
	void saveRetrieveAndDeleteCorrectDeveloper(){
		User user = new User();
		//user only expected to provide username and password
		Random random = new Random();
		user.setUsername("unit_test_save_dev" + random.nextInt(100));
		user.setPassword("unit_test_save_dev");
		User userReturned = userInfoService.saveDeveloper(user);
		assertNotNull(userReturned);

		userReturned = userInfoService.findByUserName(user.getUsername());
		assertTrue(userReturned.isEnabled());
		assertTrue(userReturned.getUsername().equals(user.getUsername()));
		assertTrue(userReturned.getPassword().equals(user.getPassword()));
		Iterator<Role> roleIterator = userReturned.getRoles().iterator();
		for(int i = 0; i < userReturned.getRoles().size(); i++){
			Role role = roleIterator.next();
			if(i == 0){
				assertEquals(role.getId(), 1);
				assertTrue(role.getName().equals("ROLE_DEVELOPER"));
			} else if(i == 1){
				assertEquals(role.getId(), 2);
				assertTrue(role.getName().equals("ROLE_CLIENT"));
			}
		}
		userInfoService.deleteByUsername(user.getUsername());
		userReturned = userInfoService.findByUserName(user.getUsername());
		assertNull(userReturned);
	}
}
