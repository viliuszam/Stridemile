package com.example.stracker.tracking;

import android.content.Context;
import android.widget.Toast;

import com.example.stracker.MainActivity;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class MovementTracker {

    private int bufferedSteps;
    private double bufferedDistance;
    private ScheduledExecutorService scheduler;
    private final Context view;

    public MovementTracker(Context view){
        this.reset();
        this.view = view;

        scheduler = Executors.newScheduledThreadPool(1);

        Runnable commitDataTask = () -> {
            // TODO: vietoj parodymo, issiust i API, also - pridet laika praleista tik judant
            System.out.println(bufferedSteps + ", " + bufferedDistance);
            this.reset();
        };

        scheduler.scheduleAtFixedRate(commitDataTask, 0, 30, TimeUnit.SECONDS);
    }

    public void accumulate(int steps, double distance){
        this.bufferedSteps += steps;
        this.bufferedDistance += distance;
    }

    public void reset(){
        this.bufferedSteps = 0;
        this.bufferedDistance = 0;
    }

    public void finalize() {
        if (scheduler != null && !scheduler.isShutdown()) {
            scheduler.shutdown();
        }
    }

    public int getBufferedSteps() {
        return bufferedSteps;
    }

    public double getBufferedDistance() {
        return bufferedDistance;
    }

    public float getStepLength() {
        return 0.762f;
    }
}
