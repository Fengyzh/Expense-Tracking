package com.SW.Project_fin.utils;

import java.util.ArrayList;

public class DateConverter {

    public String convertDate(String date) {
        String convertedDate;
        String[] DateList = date.split("-");
        convertedDate = DateList[1] + "-" + DateList[2] + "-" + DateList[0];
        return convertedDate;
    }


    public String extractYear(String date) {
        String convertedDate;
        String[] DateList = date.split("-");
        return DateList[0];
    }

    public int extractMonth(String date) {
        int month = 0;
        String[] DateList = date.split("-");
        return Integer.parseInt(DateList[1]);
    }

}
