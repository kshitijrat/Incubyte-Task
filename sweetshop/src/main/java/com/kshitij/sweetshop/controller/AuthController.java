package com.kshitij.sweetshop.controller;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kshitij.sweetshop.model.Role;
import com.kshitij.sweetshop.model.User;
import com.kshitij.sweetshop.payload.request.LoginRequest;
import com.kshitij.sweetshop.payload.request.RegisterRequest;
import com.kshitij.sweetshop.payload.response.JwtResponse;
import com.kshitij.sweetshop.repository.UserRepo;
import com.kshitij.sweetshop.security.JwtUtils;

import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepo userRepo;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public AuthController(UserRepo userRepo, PasswordEncoder encoder, JwtUtils jwtUtils,
            AuthenticationManager authenticationManager) {
        this.userRepo = userRepo;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (userRepo.existsByUsername(req.getUsername())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username already taken"));
        }
        User u = new User();
        u.setUsername(req.getUsername());
        u.setPassword(encoder.encode(req.getPassword()));
        u.setRoles(req.isAdmin() ? Set.of(Role.ROLE_ADMIN) : Set.of(Role.ROLE_USER));
        userRepo.save(u);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(auth);

        String token = jwtUtils.generateJwtToken(auth.getName());

        UserDetails userDetails = (UserDetails) auth.getPrincipal(); // load principal
        String role = userDetails.getAuthorities().iterator().next().getAuthority();

        return ResponseEntity.ok(new JwtResponse(token, role));
    }

}
