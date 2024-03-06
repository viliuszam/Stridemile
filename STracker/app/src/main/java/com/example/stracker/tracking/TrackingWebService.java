package com.example.stracker.tracking;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.Headers;
import retrofit2.http.POST;

public interface TrackingWebService {
    @Headers("Content-Type: application/json")
    @POST("/activity/track/")
    Call<TrackingResponse> track(@Header("Authorization") String authHeader,
                                 @Body TrackingRequest trackingRequest);
}