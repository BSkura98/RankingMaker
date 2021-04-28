package com.bartlomiejskura.rankingmaker.service;

import com.bartlomiejskura.rankingmaker.exception.EntityNotFoundException;
import com.bartlomiejskura.rankingmaker.model.Ranking;
import com.bartlomiejskura.rankingmaker.model.RankingGroup;
import com.bartlomiejskura.rankingmaker.repository.RankingGroupRepository;
import com.bartlomiejskura.rankingmaker.repository.RankingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RankingService {
    @Autowired
    private RankingRepository rankingRepository;

    @Autowired
    private RankingGroupRepository rankingGroupRepository;

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

    public List<Ranking> getAllInGroup(Long rankingGroupId) throws EntityNotFoundException {
        RankingGroup rankingGroup = rankingGroupRepository.findById(rankingGroupId).orElseThrow(EntityNotFoundException::new);
        return rankingGroup.getRankings();
    }

    public List<Ranking> updateRankings(List<Ranking> rankings){
        for(Ranking ranking:rankings){
            rankingRepository.save(ranking);
        }
        return rankings;
    }
}
