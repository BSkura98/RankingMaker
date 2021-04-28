package com.bartlomiejskura.rankingmaker.repository;

import com.bartlomiejskura.rankingmaker.model.RankedItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RankedItemRepository extends JpaRepository<RankedItem, Long> {
}
