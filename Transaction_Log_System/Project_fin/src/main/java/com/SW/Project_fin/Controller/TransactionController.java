package com.SW.Project_fin.Controller;


import com.SW.Project_fin.Pojo.Stores;
import com.SW.Project_fin.Pojo.Transaction;
import com.SW.Project_fin.Pojo.TransactionDTO;
import com.SW.Project_fin.Repository.StoreRepo;
import com.SW.Project_fin.Repository.TransactionRepo;
import com.SW.Project_fin.Service.TransactionsService;
import com.SW.Project_fin.utils.DateConverter;
import org.apache.catalina.Store;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Controller
@CrossOrigin
public class TransactionController {

    private final TransactionRepo transactionRepo;
    private final StoreRepo StoreRepo;
    private final TransactionsService transactionsService;

    @Autowired
    public TransactionController(TransactionRepo transactionRepo, StoreRepo storeRepo, TransactionsService transactionsService) {
        this.transactionRepo = transactionRepo;
        this.StoreRepo = storeRepo;
        this.transactionsService = transactionsService;
    }

    @RequestMapping("/")
    @ResponseBody
    public List<TransactionDTO> getAllTransations() {
       return transactionsService.processAllTransactions();

    }

    @GetMapping("/{id}")
    @ResponseBody
    public Optional<Transaction> getTransactionById(@PathVariable Integer id) {
        //System.out.println(id);
        Optional<Transaction> result = transactionRepo.findById(id);
        return result;
    }

    @GetMapping("/stores")
    @ResponseBody
    public List<Stores> getAllStores() {
        List<Stores> results = StoreRepo.findAll();
        return results;
    }

    @PostMapping("/")
    public ResponseEntity<String> addEntry(@RequestBody Transaction data) {
        DateConverter dateConverter = new DateConverter();

        System.out.println("date"+ data.getDate());


        Transaction entry = new Transaction();
        entry.setDate(data.getDate());
        entry.setName(data.getName());
        entry.setPrice(data.getPrice());
        entry.setCategory(data.getCategory());
        entry.setAmount(data.getAmount());
        entry.setNote(data.getNote());
        entry.setPurpose(data.getPurpose());
        transactionRepo.save(entry);

        return ResponseEntity.ok("Insertion Complete");
    }


}
