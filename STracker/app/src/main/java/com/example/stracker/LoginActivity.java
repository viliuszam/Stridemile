package com.example.stracker;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.stracker.authentication.AuthService;
import com.example.stracker.authentication.AuthTokenResponse;
import com.example.stracker.authentication.LoginRequest;

import org.json.JSONArray;
import org.json.JSONObject;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LoginActivity extends AppCompatActivity {

    private EditText usernameEditText;
    private EditText passwordEditText;
    private Button loginButton;

    // Authentication service
    private AuthService authService;

    // HTTP client
    private Retrofit retrofit;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        //TODO: kolkas visi credentials'ai siunciami per cleartext,
        // kol nepridejau interceptoriaus nebuvo aisku kodel niekas neveikia,
        // ateity - butu gerai musu backe turet HTTPS

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        // Atkomentuot viska toliau jeigu reikia debugginimui
        /*
        HttpLoggingInterceptor loggingInterceptor = new HttpLoggingInterceptor();
        loggingInterceptor.setLevel(HttpLoggingInterceptor.Level.BODY);

        OkHttpClient client = new OkHttpClient.Builder()
                .addInterceptor(loggingInterceptor)
                .build();*/


        // Vietoj "localhost" naudot savo privatu ip, localhost'u emuliatorius laiko save, o serveris gi ne emuliatoriuj
        retrofit = new Retrofit.Builder().baseUrl("http://192.168.1.101:3333")
                /*.client(client)*/.addConverterFactory(GsonConverterFactory.create()).build();
        authService = retrofit.create(AuthService.class);

        usernameEditText = findViewById(R.id.usernameEditText);
        passwordEditText = findViewById(R.id.passwordEditText);
        loginButton = findViewById(R.id.loginButton);

        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String username = usernameEditText.getText().toString().trim();
                String password = passwordEditText.getText().toString().trim();

                // Authentication logic
                login(username, password);

            }
        });
    }
    private void showPopupNotification(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }

    private void login(String username, String password) {
        LoginRequest loginRequest = new LoginRequest(username, password);

        authService.login(loginRequest).enqueue(new Callback<AuthTokenResponse>() {
            @Override
            public void onResponse(Call<AuthTokenResponse> call, Response<AuthTokenResponse> response) {
                if (response.isSuccessful()) {
                    AuthTokenResponse authTokenResponse = response.body();
                    String accessToken = authTokenResponse.getAccess_token();

                    SharedPreferences.Editor editor = getSharedPreferences("auth", MODE_PRIVATE).edit();
                    editor.putString("access_token", accessToken);
                    editor.putString("username", username);
                    editor.apply();
                    showPopupNotification("Login successful!");
                    Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                    startActivity(intent);
                    finish();
                } else {
                    try {
                        JSONObject errorBody = new JSONObject(response.errorBody().string());
                        Object message = errorBody.get("message");

                        if (message instanceof JSONArray) {
                            JSONArray messageArray = (JSONArray) message;
                            String errorMessage = messageArray.getString(0);
                            showPopupNotification(errorMessage);
                        } else if (message instanceof String) {
                            String errorMessage = (String) message;
                            showPopupNotification(errorMessage);
                        } else {
                            showPopupNotification("Unknown error occurred.");
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                        showPopupNotification("Login failed.");
                    }
                }
            }

            @Override
            public void onFailure(Call<AuthTokenResponse> call, Throwable t) {
                showPopupNotification("Login failed.");
            }
        });
    }
}
