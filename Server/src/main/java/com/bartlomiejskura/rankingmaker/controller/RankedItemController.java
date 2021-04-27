package com.bartlomiejskura.rankingmaker.controller;

import com.bartlomiejskura.rankingmaker.exception.EntityNotFoundException;
import com.bartlomiejskura.rankingmaker.model.RankedItem;
import com.bartlomiejskura.rankingmaker.service.RankedItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rankedItem")
public class RankedItemController {
    @Autowired
    private RankedItemService rankedItemService;

    @GetMapping("/getAll")
    public List<RankedItem> getAll(){
        return rankedItemService.getAll();
    }

    @PostMapping
    public RankedItem addRankedItem(@RequestBody RankedItem rankedItem){
        return rankedItemService.addRankedItem(rankedItem);
    }

    @GetMapping
    public RankedItem getRankedItem(@RequestParam(name="rankedItemId")Long rankedItemId){
        try {
            return rankedItemService.getRankedItem(rankedItemId);
        } catch (EntityNotFoundException e) {
            return null;
        }
    }

    @PutMapping
    public RankedItem editRankedItem(@RequestBody RankedItem rankedItem){
        return rankedItemService.editRankedItem(rankedItem);
    }

    @DeleteMapping
    public void deleteRankedItem(@RequestParam(name="rankedItemId")Long rankedItemId){
        rankedItemService.deleteRankedItem(rankedItemId);
    }
}
