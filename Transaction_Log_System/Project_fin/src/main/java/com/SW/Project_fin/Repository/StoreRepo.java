package com.SW.Project_fin.Repository;


import com.SW.Project_fin.Pojo.Stores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreRepo extends JpaRepository<Stores, Integer> {


}
