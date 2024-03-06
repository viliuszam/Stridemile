package com.example.stracker.tracking;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.PowerManager;
import android.widget.Toast;

import com.example.stracker.LoginActivity;
import com.example.stracker.networking.RetrofitClient;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MovementTracker {

    private int bufferedSteps;
    private float bufferedDistance;
    private ScheduledExecutorService scheduler;
    private final Context context;

    private TrackingWebService trackingWebService;

    // Judejimo duomenu siuntimo intervalas sekundemis
    private final int POLLING_INTERVAL = 5 * 60;

    private PowerManager.WakeLock wakeLock;

    public MovementTracker(Context context){
        this.reset();
        this.context = context;
        this.trackingWebService = RetrofitClient.getClient().create(TrackingWebService.class);
        this.scheduler = Executors.newScheduledThreadPool(1);

        // Reikia kad trackintu kai telefonas uzrakintas
        PowerManager powerManager = (PowerManager) context.getSystemService(Context.POWER_SERVICE);
        wakeLock = powerManager.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "MovementTrackerWakeLock:");
        wakeLock.acquire();

        scheduler.scheduleWithFixedDelay(this::postMovementData, POLLING_INTERVAL, POLLING_INTERVAL, TimeUnit.SECONDS);
    }

    // I API issiuncia sukauptus judejimo duomenis
    private void postMovementData(){
        if(bufferedSteps <= 0 || bufferedDistance <= 0) return;
        String accessToken = getAccessToken();
        // Atsijungiam, nera tokeno kazkodel lol
        if(accessToken == null){
            logout();
            return;
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        Calendar startTime = Calendar.getInstance(), endTime = Calendar.getInstance();
        startTime.add(Calendar.SECOND, -POLLING_INTERVAL);
        String formattedStartTime = sdf.format(startTime.getTime());
        String formattedEndTime = sdf.format(endTime.getTime());

        TrackingRequest trackingRequest = new TrackingRequest(bufferedSteps, bufferedDistance,
                formattedStartTime, formattedEndTime);

        trackingWebService.track("Bearer " + accessToken, trackingRequest).enqueue(new Callback<TrackingResponse>() {
            @Override
            public void onResponse(Call<TrackingResponse> call, Response<TrackingResponse> response) {
                if (response.isSuccessful()) {
                    // TODO: gaut ir atnaujint sumuota informacija naudotojui

                    // Trinam sukauptus movement duomenis
                    reset();
                } else {
                    // Jei kazkas nepavyksta su siuntimu tai tsg atjungiam useri lol
                    logout();
                }
            }

            @Override
            public void onFailure(Call<TrackingResponse> call, Throwable t) {
                // Jei kazkas nepavyksta su siuntimu tai tsg atjungiam useri lol
                logout();
            }
        });
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
        if (wakeLock != null && wakeLock.isHeld()) {
            wakeLock.release();
            wakeLock = null;
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

    private String getAccessToken() {
        SharedPreferences sharedPreferences = context.getSharedPreferences("auth", Context.MODE_PRIVATE);
        String accessToken = sharedPreferences.getString("access_token", null);
        return accessToken;
    }

    // TODO: iskelt visiskai viska kas turi kazko bendro su sesija i atskira manager klase
    private void logout(){
        this.finalize();
        SharedPreferences sharedPreferences = context.getSharedPreferences("auth", Context.MODE_PRIVATE);
        sharedPreferences.edit().clear().apply();
        context.stopService(new Intent(context, TrackingService.class));

        Intent intent = new Intent(context.getApplicationContext(), LoginActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        context.startActivity(intent);

        Toast.makeText(context, "Logged out", Toast.LENGTH_LONG).show();
    }

}
