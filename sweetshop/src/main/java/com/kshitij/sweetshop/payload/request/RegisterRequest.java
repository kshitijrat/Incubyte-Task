package com.kshitij.sweetshop.payload.request;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
@Getter @Setter
public class RegisterRequest {
    private String username;
    private String password;
    @JsonProperty("isAdmin")
    private boolean isAdmin;
}
