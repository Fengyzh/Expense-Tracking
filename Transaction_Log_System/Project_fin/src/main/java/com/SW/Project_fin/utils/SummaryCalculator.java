package com.SW.Project_fin.utils;

import com.SW.Project_fin.Pojo.Transaction;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

public class SummaryCalculator {

    private List<Transaction> transaction;
    private HashMap<String, ArrayList<Double>> summary;

    private DateConverter dc = new DateConverter();
    public SummaryCalculator(List<Transaction> transaction, HashMap<String, ArrayList<Double>> summary) {
        this.transaction = transaction;
        this.summary = summary;
    }


    public void generate() {
        summary.put("avg", calculateYear(true));
        summary.put("yearSpending", calculateYear(false));
        summary.put("monthSpending", calculateMonthlySpending());
        //summary.put("spendingCategory", calculateSpendingCategory());
    }

    private ArrayList<Double> calculateSpendingCategory() {
        ArrayList<Double> l = new ArrayList<>(Collections.nCopies(12, 0.0));


        return l;
    }

    private ArrayList<Double> calculateMonthlySpending() {
        ArrayList<Double> l = new ArrayList<>(Collections.nCopies(12, 0.0));
        for (int i = 0; i < transaction.size(); i++) {
            int index = dc.extractMonth(transaction.get(i).getDate())-1;
            l.set(index, l.get(index) + transaction.get(i).getPrice() * transaction.get(i).getAmount());
        }

        return l;
    }

    private ArrayList<Double> calculateYear(boolean avg) {
        ArrayList<Double> l = new ArrayList<>();
        double total = 0;
        for (int i = 0; i < transaction.size(); i++) {
            total += transaction.get(i).getPrice() * transaction.get(i).getAmount();
        }

        if (avg) {
            l.add(total / transaction.size());
        } else {
            l.add(total);
        }
        return l;

    }
}
