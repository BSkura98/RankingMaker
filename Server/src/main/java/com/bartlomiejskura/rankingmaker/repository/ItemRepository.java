package com.bartlomiejskura.rankingmaker.repository;

import com.bartlomiejskura.rankingmaker.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
}
