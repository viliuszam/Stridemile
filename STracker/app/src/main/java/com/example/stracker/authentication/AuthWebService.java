package com.example.stracker.authentication;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Headers;
import retrofit2.http.POST;

public interface AuthWebService {
    @Headers("Content-Type: application/json")
    @POST("/auth/signin/")
    Call<AuthTokenResponse> login(@Body LoginRequest loginRequest);
}