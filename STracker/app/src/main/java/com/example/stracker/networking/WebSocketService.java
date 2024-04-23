package com.example.stracker.networking;

import static java.util.Collections.singletonList;
import static java.util.Collections.singletonMap;

import android.content.Context;
import android.util.Log;
import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

import org.json.JSONException;
import org.json.JSONObject;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class WebSocketService {
    private static final String TAG = WebSocketService.class.getSimpleName();
    private static final String SERVER_URL = "http://192.168.1.101:3333";

    private Socket socket;

    private Context context;

    public WebSocketService(Context context) {
        try {
            this.context = context;
            IO.Options options = IO.Options.builder()
                    .setExtraHeaders(singletonMap("authorization",
                            singletonList("bearer " + getAccessToken())))
                    .build();
            socket = IO.socket(URI.create(SERVER_URL), options);
            socket.on(Socket.EVENT_CONNECT_ERROR, args13 -> System.out.println("connection error"));
            socket.on(Socket.EVENT_CONNECT, onConnect);
            socket.on("userLocation", onUserLocationReceived);
            socket.connect();
        } catch (Exception e) {
            Log.e(TAG, "Error creating WebSocket connection", e);
        }
    }

    private final Emitter.Listener onConnect = new Emitter.Listener() {
        @Override
        public void call(Object... args) {
            Log.d(TAG, "WebSocket connection established");
        }
    };

    // Jei reiks cliente gaut kitu naudotoju lokacijas
    private final Emitter.Listener onUserLocationReceived = new Emitter.Listener() {
        @Override
        public void call(Object... args) {
            JSONObject data = (JSONObject) args[0];
            try {
                int userId = data.getInt("userId");
                JSONObject location = data.getJSONObject("location");
            } catch (JSONException e) {
                Log.e(TAG, "Error parsing user location data", e);
            }
        }
    };

    public void sendUserLocation(JSONObject location) {
        JSONObject data = new JSONObject();
        try {
            data.put("location", location);
            socket.emit("userLocation", data);
        } catch (JSONException e) {
            Log.e(TAG, "Error sending user location data", e);
        }
    }

    public void disconnect() {
        socket.disconnect();
    }

    private String getAccessToken() {
        return context.getSharedPreferences("auth", Context.MODE_PRIVATE).getString("access_token", null);
    }
}