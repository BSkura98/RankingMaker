package com.bartlomiejskura.rankingmaker.controller;

import com.bartlomiejskura.rankingmaker.exception.EntityNotFoundException;
import com.bartlomiejskura.rankingmaker.model.Ranking;
import com.bartlomiejskura.rankingmaker.service.RankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ranking")
public class RankingController {
    @Autowired
    private RankingService rankingService;

    @GetMapping("/getAll")
    public List<Ranking> getAll(){
        return rankingService.getAll();
    }

    @PostMapping
    public Ranking addRanking(@RequestBody Ranking ranking){
        return rankingService.addRanking(ranking);
    }

    @GetMapping
    public Ranking getRanking(@RequestParam(name="rankingId")Long rankingId){
        try {
            return rankingService.getRanking(rankingId);
        } catch (EntityNotFoundException e) {
            return null;
        }
    }

    @PutMapping
    public Ranking editRanking(@RequestBody Ranking ranking){
        return rankingService.editRanking(ranking);
    }

    @DeleteMapping
    public void deleteRanking(@RequestParam(name="rankingId")Long rankingId){
        rankingService.deleteRanking(rankingId);
    }
}
