package com.SW.Project_fin.Pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDTO {

    String year;
    List<Transaction> transaction = new ArrayList<>();


    public TransactionDTO(String extractedYear) {
        this.year = extractedYear;
    }
}
