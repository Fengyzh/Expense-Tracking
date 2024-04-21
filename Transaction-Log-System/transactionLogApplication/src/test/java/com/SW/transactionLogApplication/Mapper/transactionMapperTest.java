package com.SW.transactionLogApplication.Mapper;

import com.SW.transactionLogApplication.pojo.Transaction;
import com.SW.transactionLogApplication.utils.mybatisUtils;
import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;
import java.util.List;

public class transactionMapperTest {


    @Test
    void getAllLog() {







        SqlSession sqlSession = mybatisUtils.getSqlSession();

        TransactionMapper mapper = sqlSession.getMapper(TransactionMapper.class);
        List<Transaction> result = mapper.getAll();

        for (Transaction transaction : result) {
            System.out.println(transaction);
        }

        sqlSession.close();

    }

}
