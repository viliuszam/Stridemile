package com.example.stracker.utility;

public class FormatUtil {
    public static String formatTime(long seconds) {
        long days = seconds / (24 * 3600);
        seconds = seconds % (24 * 3600);
        long hours = seconds / 3600;
        seconds = seconds % 3600;
        long minutes = seconds / 60;
        seconds = seconds % 60;

        return String.format("%dd, %dh, %dm, %ds", days, hours, minutes, seconds);
    }

}
