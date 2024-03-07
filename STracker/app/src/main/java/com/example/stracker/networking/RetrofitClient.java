package com.example.stracker.networking;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitClient {

    // Singleton klase skirta visam projektui suteikti prieiga prie vieno Retrofit instance

    private static Retrofit retrofit;

    private RetrofitClient() {}

    public static Retrofit getClient() {
        if (retrofit == null) {
            // Atkomentuot ir pridet prie retrofit jei reikia debuggint uzklausas
            /*
            HttpLoggingInterceptor loggingInterceptor = new HttpLoggingInterceptor();
            loggingInterceptor.setLevel(HttpLoggingInterceptor.Level.BODY);

            OkHttpClient client = new OkHttpClient.Builder()
                    .addInterceptor(loggingInterceptor)
                    .build();

             */

            retrofit = new Retrofit.Builder()
                    // Vietoj "localhost" naudot savo privatu ip, localhost'u emuliatorius laiko save, o serveris gi ne emuliatoriuj
                    .baseUrl("http://0.0.0.0:3333")
                    /*.client(client)*/
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit;
    }
}