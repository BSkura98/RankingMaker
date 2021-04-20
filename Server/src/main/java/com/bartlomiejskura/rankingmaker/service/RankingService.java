package com.bartlomiejskura.rankingmaker.service;

import com.bartlomiejskura.rankingmaker.exception.EntityNotFoundException;
import com.bartlomiejskura.rankingmaker.model.Ranking;
import com.bartlomiejskura.rankingmaker.repository.RankingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RankingService {
    @Autowired
    private RankingRepository rankingRepository;

    public Ranking addRanking(Ranking ranking){
        return rankingRepository.save(ranking);
    }

    public Ranking getRanking(Long rankingId) throws EntityNotFoundException {
        return rankingRepository.findById(rankingId).orElseThrow(EntityNotFoundException::new);
    }

    public List<Ranking> getAll(){
        return rankingRepository.findAll();
    }

    public Ranking editRanking(Ranking ranking){
        return rankingRepository.save(ranking);
    }

    public void deleteRanking(Long rankingId){
        rankingRepository.deleteById(rankingId);
    }
}