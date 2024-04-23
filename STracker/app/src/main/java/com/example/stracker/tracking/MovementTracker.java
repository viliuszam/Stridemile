package com.example.stracker.tracking;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.location.Location;
import android.location.LocationManager;
import android.os.PowerManager;
import android.util.Log;
import android.widget.Toast;

import com.example.stracker.LoginActivity;
import com.example.stracker.networking.RetrofitClient;
import com.example.stracker.networking.WebSocketService;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.json.JSONException;
import org.json.JSONObject;

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
    // Padaryt sita reiksme ateity didesne, kad siustu kas kelias minutes turbut
    private final int POLLING_INTERVAL = 10;

    private PowerManager.WakeLock wakeLock;

    private Date lastSendTime;

    private WebSocketService webSocketService;

    public MovementTracker(Context context){
        this.reset();
        this.context = context;
        this.webSocketService = new WebSocketService(context);
        this.trackingWebService = RetrofitClient.getClient().create(TrackingWebService.class);
        this.scheduler = Executors.newScheduledThreadPool(2);

        this.lastSendTime = Calendar.getInstance().getTime();

        this.retrieveSummary();

        // Reikia kad trackintu kai telefonas uzrakintas
        PowerManager powerManager = (PowerManager) context.getSystemService(Context.POWER_SERVICE);
        wakeLock = powerManager.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "MovementTrackerWakeLock:");
        wakeLock.acquire();

        scheduler.scheduleWithFixedDelay(this::postMovementData, POLLING_INTERVAL, POLLING_INTERVAL, TimeUnit.SECONDS);
        scheduler.scheduleWithFixedDelay(this::sendTimeUpdate, 1, 1, TimeUnit.SECONDS);
        scheduler.scheduleWithFixedDelay(this::trackLocation, 300, 300, TimeUnit.MILLISECONDS);
    }

    private void trackLocation(){
        LocationManager locationManager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
        try {
            Location lastKnownLocation = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);

            if (lastKnownLocation == null) {
                lastKnownLocation = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
            }

            if (lastKnownLocation != null) {
                double latitude = lastKnownLocation.getLatitude();
                double longitude = lastKnownLocation.getLongitude();

                // Send user location data
                JSONObject location = new JSONObject();
                location.put("latitude", latitude);
                location.put("longitude", longitude);
                webSocketService.sendUserLocation(location);
            }
        } catch (SecurityException | JSONException e) {
            Log.e(this.getClass().getSimpleName(), "Error getting location or creating location data", e);
        }
    }

    private void sendTimeUpdate(){
        // Lokaliai atnaujinamas "total" time
        ((TrackingService)context).updateTime();
    }

    private void retrieveSummary() {
        String accessToken = getAccessToken();
        // Atsijungiam, nera tokeno kazkodel lol
        if(accessToken == null){
            logout();
            return;
        }
        trackingWebService.summary("Bearer " + accessToken).enqueue(new Callback<SummaryResponse>() {
            @Override
            public void onResponse(Call<SummaryResponse> call, Response<SummaryResponse> response) {
                if (response.isSuccessful()) {
                    ((TrackingService)context).broadcastSummary(response.body());
                } else {
                    logout();
                }
            }
            @Override
            public void onFailure(Call<SummaryResponse> call, Throwable t) {
                logout();
            }
        });
    }

    // I API issiuncia sukauptus judejimo duomenis
    private void postMovementData(){
        //if(bufferedSteps <= 0 || bufferedDistance <= 0) return;
        String accessToken = getAccessToken();
        // Atsijungiam, nera tokeno kazkodel lol
        if(accessToken == null){
            logout();
            return;
        }
        Date currentTime = Calendar.getInstance().getTime();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        String formattedStartTime = sdf.format(lastSendTime);
        String formattedEndTime = sdf.format(currentTime);

        TrackingRequest trackingRequest = new TrackingRequest(bufferedSteps, bufferedDistance,
                formattedStartTime, formattedEndTime);

        trackingWebService.track("Bearer " + accessToken, trackingRequest).enqueue(new Callback<TrackingResponse>() {
            @Override
            public void onResponse(Call<TrackingResponse> call, Response<TrackingResponse> response) {
                if (response.isSuccessful()) {
                    //Atnaujinam last time
                    lastSendTime = currentTime;
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

    public void shutdown() {
        webSocketService.disconnect();
        if (scheduler != null && !scheduler.isShutdown()) {
            scheduler.shutdown();
        }
        if (wakeLock != null && wakeLock.isHeld()) {
            wakeLock.release();
            wakeLock = null;
        }
        postMovementData();
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
        SharedPreferences sharedPreferences = context.getSharedPreferences("auth", Context.MODE_PRIVATE);
        sharedPreferences.edit().clear().apply();
        context.stopService(new Intent(context, TrackingService.class));

        Intent intent = new Intent(context.getApplicationContext(), LoginActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        context.startActivity(intent);

        Toast.makeText(context, "Logged out", Toast.LENGTH_LONG).show();
    }

}
