package com.SW.Project_fin.Pojo;

import com.SW.Project_fin.utils.SummaryCalculator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDTO {

    String year;
    List<Transaction> transaction = new ArrayList<>();
    HashMap<String, ArrayList<Double>> summary = new HashMap<>();


    public TransactionDTO(String extractedYear) {
        this.year = extractedYear;
    }

    public void generateSummary() {
        SummaryCalculator summaryCalculator = new SummaryCalculator(transaction, summary);
        summaryCalculator.generate();
    }

}
