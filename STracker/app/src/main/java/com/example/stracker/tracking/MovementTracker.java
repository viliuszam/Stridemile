package com.example.stracker.tracking;

import android.widget.Toast;

import com.example.stracker.MainActivity;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class MovementTracker {

    private int bufferedSteps;
    private double bufferedDistance;
    private ScheduledExecutorService scheduler;
    private final MainActivity view;

    public MovementTracker(MainActivity view){
        this.reset();
        this.view = view;

        scheduler = Executors.newScheduledThreadPool(1);

        Runnable commitDataTask = () -> {
            // TODO: vietoj parodymo, issiust i API, also - pridet laika praleista tik judant
            view.runOnUiThread(() -> {
                Toast.makeText(view, bufferedSteps + ", " + bufferedDistance, Toast.LENGTH_SHORT).show();

                this.reset();
            });
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
}
