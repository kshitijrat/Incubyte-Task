package com.kshitij.sweetshop.payload.response;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
@Getter @Setter @AllArgsConstructor
public class JwtResponse {
    private String token;
    private String role;
}
