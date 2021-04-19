package com.bartlomiejskura.rankingmaker.repository;

import com.bartlomiejskura.rankingmaker.model.Ranking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RankingRepository extends JpaRepository<Ranking, Long> {
}
