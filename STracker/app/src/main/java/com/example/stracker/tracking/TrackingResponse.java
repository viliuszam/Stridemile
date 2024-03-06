package com.example.stracker.tracking;

import com.google.gson.annotations.SerializedName;

public class TrackingResponse {

/*    {
        "id": 9,
            "fk_Userid": 1,
            "steps": 1000,
            "distance": 2,
            "start_time": "2023-05-01T10:30:00.000Z",
            "end_time": "2023-05-01T11:15:00.000Z"
    }*/

    private int id;
    private int userId;
    private int steps;
    private float distance;

    private String startTime;

    private String endTime;

    public TrackingResponse(int id, int userId, int steps, float distance, String startTime, String endTime) {
        this.id = id;
        this.userId = userId;
        this.steps = steps;
        this.distance = distance;
        this.startTime = startTime;
        this.endTime = endTime;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
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
