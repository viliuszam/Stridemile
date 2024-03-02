package com.example.stracker;

import androidx.appcompat.app.AppCompatActivity;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import android.annotation.SuppressLint;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.Manifest;
import android.widget.Toast;

import com.example.stracker.tracking.MovementTracker;
import com.example.stracker.tracking.TrackingService;

import java.util.Locale;

import pub.devrel.easypermissions.AfterPermissionGranted;
import pub.devrel.easypermissions.EasyPermissions;
import pub.devrel.easypermissions.PermissionRequest;

public class MainActivity extends AppCompatActivity /*implements SensorEventListener*/{

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        EasyPermissions.onRequestPermissionsResult(requestCode, permissions, grantResults, this);
    }

    private TextView stepCountTextView;
    private TextView distanceTextView;
    private TextView timeTextView;
    private TextView stepCountTargetTextView;
    private TextView greetingTextView;
    //private Button pauseButton;

    private int stepCount = 0;
    private ProgressBar progressBar;
    //private boolean isPaused = false;
    //private long timePaused = 0;
    private int stepCountTarget = 5000;

    private int numSteps = 0;

    private BroadcastReceiver stepCountReceiver;

    @Override
    protected void onDestroy() {
        super.onDestroy();
        stopService(new Intent(this, TrackingService.class));
        LocalBroadcastManager.getInstance(this).unregisterReceiver(stepCountReceiver);
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel("tracking_channel", "Tracking Channel", NotificationManager.IMPORTANCE_HIGH);
            channel.setDescription("Tracking channel for foreground service notification");
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }


        if (!isLoggedIn()) {
            startActivity(new Intent(this, LoginActivity.class));
            finish();
            return;
        }

        setContentView(R.layout.activity_main);

        greetingTextView = findViewById(R.id.greeting);
        greetingTextView.setText("Welcome, " + getUsername() + "!");

        String[] perms = {Manifest.permission.ACTIVITY_RECOGNITION};
        if (EasyPermissions.hasPermissions(this, perms)) {
            startService(new Intent(this, TrackingService.class));
            if (stepCountReceiver == null) {
                stepCountReceiver = new BroadcastReceiver() {
                    @Override
                    public void onReceive(Context context, Intent intent) {
                        if ("step-count-event".equals(intent.getAction())) {
                            int steps = intent.getIntExtra("steps", 0);
                            numSteps += steps;
                            stepCountTextView.setText("Steps: " + numSteps);
                            //TODO: gauti service instance, neprirasinet stebuklingu skaiciu
                            float distanceInKm = numSteps * 0.762f / 1000;
                            distanceTextView.setText(String.format(Locale.getDefault(), "Distance: %.2f km", distanceInKm));
                            progressBar.setProgress(numSteps);
                        }
                    }
                };
                LocalBroadcastManager.getInstance(this).registerReceiver(stepCountReceiver,
                        new IntentFilter("step-count-event"));
            }
            stepCountTextView = findViewById(R.id.stepCountTextView);
            distanceTextView = findViewById(R.id.stepDistanceTextView);
            timeTextView = findViewById(R.id.stepTimeTextView);
            stepCountTargetTextView = findViewById(R.id.stepCountTargetTextView);

            progressBar = findViewById(R.id.progressBar);

            //pauseButton = findViewById(R.id.pauseButton);

            //startTime = System.currentTimeMillis();

            progressBar.setMax(stepCountTarget);
            stepCountTargetTextView.setText("Step goal: " + stepCountTarget);

        } else {
            // TODO: viskas luzta kai pirma kart paleidi ir suteiki permissionus
            EasyPermissions.requestPermissions(this, "Please grant activity permission",
                    1001, perms);
        }

    }

    public void onLogoutButtonPressed(View view){
        SharedPreferences sharedPreferences = getSharedPreferences("auth", Context.MODE_PRIVATE);
        sharedPreferences.edit().clear().apply();
        stopService(new Intent(this, TrackingService.class));
        LocalBroadcastManager.getInstance(this).unregisterReceiver(stepCountReceiver);
        startActivity(new Intent(this, LoginActivity.class));
        Toast.makeText(this, "Logged out", Toast.LENGTH_LONG).show();
        finish();
    }

    private boolean isLoggedIn() {
        SharedPreferences sharedPreferences = getSharedPreferences("auth", Context.MODE_PRIVATE);
        String accessToken = sharedPreferences.getString("access_token", null);
        return accessToken != null;
    }

    private String getUsername(){
        SharedPreferences sharedPreferences = getSharedPreferences("auth", Context.MODE_PRIVATE);
        String username = sharedPreferences.getString("username", null);
        return username;
    }

}