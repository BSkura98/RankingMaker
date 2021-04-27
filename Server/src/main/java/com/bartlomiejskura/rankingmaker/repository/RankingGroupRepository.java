package com.bartlomiejskura.rankingmaker.repository;

import com.bartlomiejskura.rankingmaker.model.RankingGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RankingGroupRepository extends JpaRepository<RankingGroup, Long> {
}
