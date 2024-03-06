package com.example.stracker.tracking;

import com.google.gson.annotations.SerializedName;

public class TrackingRequest {
    private int steps;
    private float distance;
    @SerializedName("start_time")
    private String startTime;

    @SerializedName("end_time")
    private String endTime;

    public TrackingRequest(int steps, float distance, String startTime, String endTime) {
        this.steps = steps;
        this.distance = distance;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public int getSteps() {
        return steps;
    }

    public void setSteps(int steps) {
        this.steps = steps;
    }

    public float getDistance() {
        return distance;
    }

    public void setDistance(float distance) {
        this.distance = distance;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

}
