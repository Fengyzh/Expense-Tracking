package com.SW.Project_fin.Repository;

import com.SW.Project_fin.Pojo.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Integer> {

    @Query("SELECT t FROM Transaction t WHERE t.ID = :id")
    List<Transaction> testCustomQuery(@Param("id") Integer id);

}
