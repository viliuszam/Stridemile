package com.example.stracker;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.stracker.authentication.AuthWebService;
import com.example.stracker.authentication.AuthTokenResponse;
import com.example.stracker.authentication.LoginRequest;
import com.example.stracker.networking.RetrofitClient;

import org.json.JSONArray;
import org.json.JSONObject;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    private EditText usernameEditText;
    private EditText passwordEditText;
    private CheckBox shareLocationCheckbox;
    private Button loginButton;

    // Authentication service
    private AuthWebService authService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        //TODO: kolkas visi credentials'ai siunciami per cleartext,
        // kol nepridejau interceptoriaus nebuvo aisku kodel niekas neveikia,
        // ateity - butu gerai musu backe turet HTTPS

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        //Atidaro FAQ langą paspaudus
        Button faq = (Button) findViewById(R.id.faq);
        faq.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent faqintent = new Intent(LoginActivity.this, FAQActivity.class);
                startActivity(faqintent);
            }
        });

        // Atkomentuot viska toliau jeigu reikia debugginimui
        /*
        HttpLoggingInterceptor loggingInterceptor = new HttpLoggingInterceptor();
        loggingInterceptor.setLevel(HttpLoggingInterceptor.Level.BODY);

        OkHttpClient client = new OkHttpClient.Builder()
                .addInterceptor(loggingInterceptor)
                .build();*/

        authService = RetrofitClient.getClient().create(AuthWebService.class);

        usernameEditText = findViewById(R.id.usernameEditText);
        passwordEditText = findViewById(R.id.passwordEditText);
        shareLocationCheckbox = findViewById(R.id.shareLocationCheckbox);
        loginButton = findViewById(R.id.loginButton);

        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String username = usernameEditText.getText().toString().trim();
                String password = passwordEditText.getText().toString().trim();

                // Authentication logic
                login(username, password, shareLocationCheckbox.isChecked());

            }
        });
    }
    private void showPopupNotification(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }

    private void login(String username, String password, boolean shareLocation) {
        LoginRequest loginRequest = new LoginRequest(username, password);

        authService.login(loginRequest).enqueue(new Callback<AuthTokenResponse>() {
            SharedPreferences.Editor editor = getSharedPreferences("auth", MODE_PRIVATE).edit();
            @Override
            public void onResponse(Call<AuthTokenResponse> call, Response<AuthTokenResponse> response) {
                editor.putBoolean("shareLocation", shareLocation);
                editor.apply();

                if (response.isSuccessful()) {
                    AuthTokenResponse authTokenResponse = response.body();
                    String accessToken = authTokenResponse.getAccess_token();

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
                editor.putBoolean("shareLocation", false);
                editor.apply();
                showPopupNotification("Login failed.");
            }
        });
    }
}
