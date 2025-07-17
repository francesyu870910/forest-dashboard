package com.forest.service;

import com.forest.model.User;
import java.util.Optional;

public interface UserService {
    Optional<User> login(String username, String password);
    Optional<User> getCurrentUser();
    void logout();
} 