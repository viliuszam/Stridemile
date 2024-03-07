package com.example.stracker.tracking;

public class SummaryResponse
{

/*    {
        "totalSteps": 323,
            "totalDistance": 246.12605100000002,
            "totalTimeSpent": 12345
    }*/

    private int totalSteps;
    private float totalDistance;
    private int totalTimeSpent;

    public SummaryResponse(int totalSteps, float totalDistance, int totalTimeSpent) {
        this.totalSteps = totalSteps;
        this.totalDistance = totalDistance;
        this.totalTimeSpent = totalTimeSpent;
    }

    public int getTotalSteps() {
        return totalSteps;
    }

    public void setTotalSteps(int totalSteps) {
        this.totalSteps = totalSteps;
    }

    public float getTotalDistance() {
        return totalDistance;
    }

    public void setTotalDistance(float totalDistance) {
        this.totalDistance = totalDistance;
    }

    public int getTotalTimeSpent() {
        return totalTimeSpent;
    }

    public void setTotalTimeSpent(int totalTimeSpent) {
        this.totalTimeSpent = totalTimeSpent;
    }
}
