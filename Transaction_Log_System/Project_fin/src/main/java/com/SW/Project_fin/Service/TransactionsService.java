package com.SW.Project_fin.Service;


import com.SW.Project_fin.Pojo.Transaction;
import com.SW.Project_fin.Pojo.TransactionDTO;
import com.SW.Project_fin.Repository.StoreRepo;
import com.SW.Project_fin.Repository.TransactionRepo;
import com.SW.Project_fin.utils.DateConverter;
import org.springframework.ai.ollama.api.OllamaApi;
import org.springframework.ai.ollama.api.OllamaOptions;
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

        for (int j = 0; j < transactionDTOList.size(); j++) {
            transactionDTOList.get(j).generateSummary();
        }

        System.out.println(transactionDTOList.get(0).getYear());
        return transactionDTOList;
    }


    public OllamaApi.ChatResponse promptLLMQuery(String prompt) {
        String MODEL = "deepseek-coder:6.7b-instruct";
        var ollamaApi = new OllamaApi();

        var request = OllamaApi.ChatRequest.builder(MODEL)
                .withStream(false) // not streaming
                .withMessages(List.of(
                        OllamaApi.Message.builder(OllamaApi.Message.Role.SYSTEM)
                                .withContent("You are a helpful SQL assistant, you will be provided with table schemas for a database and you have to answer the user by providing SQL query that would meet the need of the user. You are only allowed to reply in plain text format with the SQL query (example:'SELECT * FROM items;').  You are only allowed to provide SELECT queries.. Below is the table schema for the database: items ( ID SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, amount INT, category VARCHAR(255), date DATE, note VARCHAR(255), price DECIMAL(10,2), purpose VARCHAR(255), store_name VARCHAR(255)); stores ( storeID SERIAL PRIMARY KEY, store_name VARCHAR(255), address VARCHAR(255), FOREIGN KEY (store_name) REFERENCES items(store_name));")
                                .build(),
                        OllamaApi.Message.builder(OllamaApi.Message.Role.USER)
                                .withContent("what is the total amount of stores in the database?")
                                .build(),
                        OllamaApi.Message.builder(OllamaApi.Message.Role.ASSISTANT)
                                .withContent("SELECT count(*) FROM stores")
                                .build(),
                        OllamaApi.Message.builder(OllamaApi.Message.Role.USER)
                                //.withContent("Find me all the items were bought in 'Super Mart'")
                                .withContent(prompt)
                                .build()
                        ))
                .withOptions(OllamaOptions.create().withTemperature(0.1f))
                .build();


        //var chatClient = new OllamaChatClient(ollamaApi).withModel(MODEL);
        /*
        chatClient.call(new Prompt(new SystemMessage("You are a helpful SQL assistant, you will be provided with table schemas for a database and you have to answer the user by providing SQL query that would meet the need of the user. You are only allowed to reply in JSON format {Query: string, the query that meet the need of the user\\'s request}. You are only allowed to provide SELECT queries.. Below is the table schema forthe database: business ( business_id SERIAL PRIMARY KEY, business_name VARCHAR(50) NOT NULL ); stores ( store_id SERIAL PRIMARY KEY, business_id INT NOT NULL, store_name VARCHAR(100) NOT NULL, store_description VARCHAR(255), FOREIGN KEY (business_id) REFERENCES business(business_id) ); open_times ( open_time_id SERIAL PRIMARY KEY , store_id INT NOT NULL, sunday_open TIME, sunday_close TIME, monday_open TIME, monday_close TIME, tuesday_open TIME, tuesday_close TIME, wednesday_open TIME, wednesday_close TIME, thursday_open TIME, thursday_close TIME, friday_open TIME, friday_close TIME, saturday_open TIME, saturday_close TIME, FOREIGN KEY (store_id) REFERENCES stores(store_id) ); services ( service_id SERIAL PRIMARY KEY, store_id INT NOT NULL, deli BOOLEAN NOT NULL, atm BOOLEAN NOT NULL, gas_station BOOLEAN NOT NULL, convenience_store BOOLEAN NOT NULL, bakery BOOLEAN NOT NULL, FOREIGN KEY (store_id) REFERENCES stores(store_id) ); addresses ( address_id SERIAL PRIMARY KEY, store_id INT NOT NULL, street_address VARCHAR(255) NOT NULL, city VARCHAR(50) NOT NULL, state CHAR(2) NOT NULL, zip_code VARCHAR(10) NOT NULL, lat Decimal(8,6) NOT NULL, long Decimal(9,6) NOT NULL, FOREIGN KEY (store_id) REFERENCES stores(store_id) );")));
        chatClient.call(new Prompt(new UserMessage("what is the total amount of stores in the database?")));
        chatClient.call(new Prompt(new AssistantMessage("{Query: SELECT count(*) FROM stores}")));
        */
        //chatClient.call(new Prompt(new UserMessage("find all the stores that have ATM available"))).toString();

        return ollamaApi.chat(request);

    }

}
