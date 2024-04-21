package com.SW.transactionLogApplication.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    int ID;
    String Name;
    String Date;
    Double Amount;
    String Purpose;
    String Note;



}
