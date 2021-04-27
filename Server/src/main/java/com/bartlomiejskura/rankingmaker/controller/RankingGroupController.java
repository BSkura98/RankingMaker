package com.bartlomiejskura.rankingmaker.controller;

import com.bartlomiejskura.rankingmaker.exception.EntityNotFoundException;
import com.bartlomiejskura.rankingmaker.model.RankingGroup;
import com.bartlomiejskura.rankingmaker.service.RankingGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rankingGroup")
public class RankingGroupController {
    @Autowired
    private RankingGroupService rankingGroupService;

    @GetMapping("/getAll")
    public List<RankingGroup> getAll(){
        return rankingGroupService.getAll();
    }

    @PostMapping
    public RankingGroup addRankingGroup(@RequestBody RankingGroup rankingGroup){
        return rankingGroupService.addRankingGroup(rankingGroup);
    }

    @GetMapping
    public RankingGroup getRankingGroup(@RequestParam(name="rankingGroupId")Long rankingGroupId){
        try {
            return rankingGroupService.getRankingGroup(rankingGroupId);
        } catch (EntityNotFoundException e) {
            return null;
        }
    }

    @PutMapping
    public RankingGroup editRankingGroup(@RequestBody RankingGroup rankingGroup){
        return rankingGroupService.editRankingGroup(rankingGroup);
    }

    @DeleteMapping
    public void deleteRankingGroup(@RequestParam(name="rankingGroupId")Long rankingGroupId){
        rankingGroupService.deleteRankingGroup(rankingGroupId);
    }
}
