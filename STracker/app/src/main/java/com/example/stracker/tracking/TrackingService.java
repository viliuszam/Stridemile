package com.example.stracker.tracking;

import android.app.Notification;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.content.SharedPreferences;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.IBinder;

import androidx.core.app.NotificationCompat;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.example.stracker.MainActivity;
import com.example.stracker.R;

public class TrackingService extends Service implements SensorEventListener {

    private SensorManager sensorManager;
    private Sensor stepCounterSensor;
    private MovementTracker movementTracker;

    private LocalBroadcastManager localBroadcastManager;

    @Override
    public void onCreate() {
        super.onCreate();
        sensorManager = (SensorManager) getSystemService(SENSOR_SERVICE);
        if (sensorManager != null) {
            stepCounterSensor = sensorManager.getDefaultSensor(Sensor.TYPE_STEP_DETECTOR);
            if (stepCounterSensor != null) {
                sensorManager.registerListener(this, stepCounterSensor, SensorManager.SENSOR_DELAY_NORMAL);
            }
        }
        localBroadcastManager = LocalBroadcastManager.getInstance(this);
        movementTracker = new MovementTracker(this);
        startForeground(1, createNotification());
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (sensorManager != null) {
            sensorManager.unregisterListener(this);
        }
        if (movementTracker != null) {
            movementTracker.finalize();
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {
        if (sensorEvent.sensor.getType() == Sensor.TYPE_STEP_DETECTOR) {
            movementTracker.accumulate(1, movementTracker.getStepLength());
            // atsargiai, lengva misinput'int per daug duomenu
            broadcastStepCount();
        }
    }

    private void broadcastStepCount() {
        Intent intent = new Intent("step-count-event");
        intent.putExtra("steps", 1);
        localBroadcastManager.sendBroadcast(intent);
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {}

    private Notification createNotification() {
        Intent notificationIntent = new Intent(this, MainActivity.class);
        notificationIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(this,
                0, notificationIntent, PendingIntent.FLAG_IMMUTABLE);

        return new NotificationCompat.Builder(this, "tracking_channel")
                .setContentTitle("Stracker Tracking")
                .setContentText("Tracking movement")
                .setSmallIcon(R.drawable.notif_icon)
                .setContentIntent(pendingIntent)
                .build();
    }


}
