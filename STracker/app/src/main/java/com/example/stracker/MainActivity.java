package com.example.stracker;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.Manifest;
import android.widget.Toast;

import com.example.stracker.tracking.MovementTracker;

import java.util.Locale;

import pub.devrel.easypermissions.AfterPermissionGranted;
import pub.devrel.easypermissions.EasyPermissions;
import pub.devrel.easypermissions.PermissionRequest;

public class MainActivity extends AppCompatActivity implements SensorEventListener{

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        EasyPermissions.onRequestPermissionsResult(requestCode, permissions, grantResults, this);
    }

    private MovementTracker movementTracker;

    private TextView stepCountTextView;
    private TextView distanceTextView;
    private TextView timeTextView;
    private TextView stepCountTargetTextView;
    private TextView greetingTextView;
    //private Button pauseButton;

    private SensorManager sensorManager;
    private Sensor stepCounterSensor;

    private int stepCount = 0;
    private ProgressBar progressBar;
    //private boolean isPaused = false;
    //private long timePaused = 0;
    private float stepLengthInMeters = 0.762f;
    private long startTime;
    private int stepCountTarget = 5000;

    private int numSteps = 0;

    private Handler timerHandler = new Handler();
    private Runnable timerRunnable = new Runnable() {
        @Override
        public void run() {
            long millis = System.currentTimeMillis() - startTime;
            int seconds = (int)(millis/1000);
            int minutes = seconds / 60;
            seconds = seconds % 60;
            timeTextView.setText(String.format(Locale.getDefault(), "Time: %02d:%02d", minutes, seconds));
            timerHandler.postDelayed(this, 1000);
        }
    };

    @Override
    protected void onResume() {
        super.onResume();

        if(stepCounterSensor != null){
            sensorManager.registerListener(this, stepCounterSensor, SensorManager.SENSOR_DELAY_FASTEST);
            timerHandler.postDelayed(timerRunnable, 0);
        }
    }

    @Override
    protected void onStop() {
        super.onStop();

        if(stepCounterSensor != null){
            sensorManager.unregisterListener(this);
            timerHandler.removeCallbacks(timerRunnable);
        }
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

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
            stepCountTextView = findViewById(R.id.stepCountTextView);
            distanceTextView = findViewById(R.id.stepDistanceTextView);
            timeTextView = findViewById(R.id.stepTimeTextView);
            stepCountTargetTextView = findViewById(R.id.stepCountTargetTextView);

            progressBar = findViewById(R.id.progressBar);

            //pauseButton = findViewById(R.id.pauseButton);

            startTime = System.currentTimeMillis();

            sensorManager = (SensorManager) getSystemService(SENSOR_SERVICE);

            movementTracker = new MovementTracker(this);

            if(sensorManager == null){
                Toast.makeText(this, "Sensor not found!", Toast.LENGTH_SHORT).show();
            }
            else{
                stepCounterSensor = sensorManager.getDefaultSensor(Sensor.TYPE_STEP_DETECTOR);
                if(stepCounterSensor!=null){
                    sensorManager.registerListener(this, stepCounterSensor, SensorManager.SENSOR_DELAY_NORMAL);
                }
                else{
                    Toast.makeText(this, "Sorry Sensor is not available!", Toast.LENGTH_LONG).show();
                }
            }

            progressBar.setMax(stepCountTarget);
            stepCountTargetTextView.setText("Step goal: " + stepCountTarget);

        } else {
            // TODO: viskas luzta kai pirma kart paleidi ir suteiki permissionus
            EasyPermissions.requestPermissions(this, "Please grant activity permission",
                    1001, perms);
        }

    }



    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {
        Sensor sensor = sensorEvent.sensor;

        if (sensor.getType() == Sensor.TYPE_STEP_DETECTOR) {
            movementTracker.accumulate(1, stepLengthInMeters);
            numSteps++;
            stepCountTextView.setText("Steps: " + numSteps);
            float distanceInKm = numSteps * stepLengthInMeters / 1000;
            distanceTextView.setText(String.format(Locale.getDefault(), "Distance: %.2f km", distanceInKm));
            progressBar.setProgress(numSteps);
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {

    }

    public void onLogoutButtonPressed(View view){
        SharedPreferences sharedPreferences = getSharedPreferences("auth", Context.MODE_PRIVATE);
        sharedPreferences.edit().clear().apply();
        this.movementTracker.finalize();
        this.movementTracker = null;
        startActivity(new Intent(this, LoginActivity.class));
        Toast.makeText(this, "Logged out", Toast.LENGTH_LONG).show();
        finish();
    }

    /*
    public void onPauseButtonPressed(View view){
        if(isPaused){
            isPaused = false;
            pauseButton.setText("Pause");
            startTime = System.currentTimeMillis() - timePaused;
            timerHandler.postDelayed(timerRunnable, 0);
        }else{
            isPaused = true;
            pauseButton.setText("Resume");
            timerHandler.removeCallbacks(timerRunnable);
            timePaused = System.currentTimeMillis() - startTime;
        }
    }


     */
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