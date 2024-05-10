package com.SW.Project_fin.Controller;


import com.SW.Project_fin.Pojo.Stores;
import com.SW.Project_fin.Pojo.Transaction;
import com.SW.Project_fin.Pojo.TransactionDTO;
import com.SW.Project_fin.Repository.StoreRepo;
import com.SW.Project_fin.Repository.TransactionRepo;
import com.SW.Project_fin.Service.TransactionsService;
import com.SW.Project_fin.utils.ResponseTrim;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@CrossOrigin
public class TransactionController {

    private final TransactionRepo transactionRepo;
    private final StoreRepo StoreRepo;
    private final TransactionsService transactionsService;

    @Autowired
    private EntityManager entityManager;


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


    // TODO: Refactor similar logic with the add route
    @PostMapping("/update")
    public ResponseEntity<String> updateEntry(@RequestBody Transaction data) {
        Transaction entry = new Transaction();
        entry.setID(data.getID());
        entry.setDate(data.getDate());
        entry.setName(data.getName());
        entry.setPrice(data.getPrice());
        entry.setCategory(data.getCategory());
        entry.setAmount(data.getAmount());
        entry.setNote(data.getNote());
        entry.setPurpose(data.getPurpose());

        System.out.println(data.getID());


        Stores existingStore = StoreRepo.findByStoreName(data.getStore_name().getStoreName());


        if (existingStore == null) {

            // Store does not exist, create a new one
            Stores newStore = new Stores();
            newStore.setAddress(data.getStore_name().getAddress()); // Set address as needed
            newStore.setStoreName(data.getStore_name().getStoreName());

            // Save the new store
            StoreRepo.save(newStore);

            // Set the new store to the transaction
            entry.setStore_name(newStore);
        } else {
            // Store already exists, set it to the transaction
            entry.setStore_name(existingStore);
        }

        // Save the transaction
        transactionRepo.save(entry);



        return new ResponseEntity<>("Entry updated successfully", HttpStatus.CREATED);
    }

    @GetMapping("/search")
    @ResponseBody
    public List<Object> searchTransaction() {
        String res = transactionsService.promptLLMQuery().message().content();
        ResponseTrim rt = new ResponseTrim();
        String msg = rt.extractSQL(res);
        Query query = entityManager.createNativeQuery(msg);
        List<Object> result = query.getResultList();


        return result;
    }



    @PostMapping("/delete")
    @ResponseBody
    public void deleteTransaction(@RequestBody Integer id) {
        System.out.println(id);
        transactionRepo.deleteById(id);
    }

    @PostMapping("/")
    public ResponseEntity<String> addEntry(@RequestBody Transaction data) {

        System.out.println(data.getStore_name());


        Transaction entry = new Transaction();
        entry.setDate(data.getDate());
        entry.setName(data.getName());
        entry.setPrice(data.getPrice());
        entry.setCategory(data.getCategory());
        entry.setAmount(data.getAmount());
        entry.setNote(data.getNote());
        entry.setPurpose(data.getPurpose());


        Stores existingStore = StoreRepo.findByStoreName(data.getStore_name().getStoreName());


        if (existingStore == null) {

            // Store does not exist, create a new one
            Stores newStore = new Stores();
            newStore.setAddress(data.getStore_name().getAddress()); // Set address as needed
            newStore.setStoreName(data.getStore_name().getStoreName());

            // Save the new store
            StoreRepo.save(newStore);

            // Set the new store to the transaction
            entry.setStore_name(newStore);
        } else {
            // Store already exists, set it to the transaction
            entry.setStore_name(existingStore);
        }

        // Save the transaction
        transactionRepo.save(entry);

        return new ResponseEntity<>("Entry added successfully", HttpStatus.CREATED);
    }

}



