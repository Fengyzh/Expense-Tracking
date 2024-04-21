package com.SW.Project_fin.Service;


import com.SW.Project_fin.Pojo.Transaction;
import com.SW.Project_fin.Pojo.TransactionDTO;
import com.SW.Project_fin.Repository.StoreRepo;
import com.SW.Project_fin.Repository.TransactionRepo;
import com.SW.Project_fin.utils.DateConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class TransactionsService {

    private final TransactionRepo transactionRepo;
    private final StoreRepo StoreRepo;

    private DateConverter dc = new DateConverter();

    @Autowired
    public TransactionsService(TransactionRepo transactionRepo, StoreRepo storeRepo) {
        this.transactionRepo = transactionRepo;
        this.StoreRepo = storeRepo;
    }


    public List<TransactionDTO> processAllTransactions() {
        List<Transaction> all = transactionRepo.findAll();
        HashMap<String, TransactionDTO> yearMap = new HashMap();
        List<TransactionDTO> transactionDTOList = new ArrayList<>();

        for (int i = 0; i < all.size(); i++) {
            String extractedYear = dc.extractYear(all.get(i).getDate());
            if (!yearMap.containsKey(extractedYear)) {
                TransactionDTO transactionDTO = new TransactionDTO(extractedYear);
                transactionDTOList.add(transactionDTO);
                yearMap.put(extractedYear, transactionDTO);
            }
            yearMap.get(extractedYear).getTransaction().add(all.get(i));

        }
        System.out.println(transactionDTOList.get(0).getYear());
        return transactionDTOList;
    }

}
