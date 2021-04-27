package com.bartlomiejskura.rankingmaker.service;

import com.bartlomiejskura.rankingmaker.exception.EntityNotFoundException;
import com.bartlomiejskura.rankingmaker.model.RankingGroup;
import com.bartlomiejskura.rankingmaker.repository.RankingGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RankingGroupService {
    @Autowired
    private RankingGroupRepository rankingGroupRepository;

    public RankingGroup addRankingGroup(RankingGroup rankingGroup){
        return rankingGroupRepository.save(rankingGroup);
    }

    public RankingGroup getRankingGroup(Long rankingGroupId) throws EntityNotFoundException {
        return rankingGroupRepository.findById(rankingGroupId).orElseThrow(EntityNotFoundException::new);
    }

    public List<RankingGroup> getAll(){
        return rankingGroupRepository.findAll();
    }

    public RankingGroup editRankingGroup(RankingGroup rankingGroup){
        return rankingGroupRepository.save(rankingGroup);
    }

    public void deleteRankingGroup(Long rankingGroupId){
        rankingGroupRepository.deleteById(rankingGroupId);
    }
}
