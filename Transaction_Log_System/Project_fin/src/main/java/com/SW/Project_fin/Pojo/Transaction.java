package com.SW.Project_fin.Pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.catalina.Store;

import java.sql.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Items")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer ID;
    String name;
    String date;
    Double amount;
    Double price;
    String purpose;
    String note;
    String category;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="store_name", referencedColumnName = "store_name")
    private Stores Store_name;

}

