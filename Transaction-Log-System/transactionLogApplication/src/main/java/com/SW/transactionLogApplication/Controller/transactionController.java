package com.SW.transactionLogApplication.Controller;

import com.SW.transactionLogApplication.Mapper.TransactionMapper;
import com.SW.transactionLogApplication.pojo.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import java.util.List;


@Controller
@RequestMapping
public class transactionController {

    @Autowired
    private TransactionMapper transactionMapper;


    @RequestMapping("/")
    @ResponseBody
    public List<Transaction> hello() {
        List<Transaction> result = transactionMapper.getAll();
        return result;
    }


    @RequestMapping("/landing")
    public String landingPage(Model model) {
        List<Transaction> result = transactionMapper.getAll();
        model.addAttribute("data", result);
        return "Landing";
    }


    @PostMapping("/post")
    @ResponseBody
    public String addlog(Transaction transaction) {
        transactionMapper.addTransaction(transaction);
        return "OKAY";
    }



}
