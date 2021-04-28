package com.bartlomiejskura.rankingmaker.service;

import com.bartlomiejskura.rankingmaker.exception.EntityNotFoundException;
import com.bartlomiejskura.rankingmaker.model.Item;
import com.bartlomiejskura.rankingmaker.model.RankedItem;
import com.bartlomiejskura.rankingmaker.model.Ranking;
import com.bartlomiejskura.rankingmaker.repository.ItemRepository;
import com.bartlomiejskura.rankingmaker.repository.RankedItemRepository;
import com.bartlomiejskura.rankingmaker.repository.RankingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RankedItemService {
    @Autowired
    private RankedItemRepository rankedItemRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private RankingRepository rankingRepository;

    public RankedItem addRankedItem(RankedItem rankedItem){
        Item item = itemRepository.save(rankedItem.getItem());
        rankedItem.setItem(item);

        return rankedItemRepository.save(rankedItem);
    }

    public RankedItem getRankedItem(Long rankedItemId) throws EntityNotFoundException {
        return rankedItemRepository.findById(rankedItemId).orElseThrow(EntityNotFoundException::new);
    }

    public List<RankedItem> getAll(){
        return rankedItemRepository.findAll();
    }

    public RankedItem editRankedItem(RankedItem rankedItem){
        return rankedItemRepository.save(rankedItem);
    }

    public void deleteRankedItem(Long rankedItemId){
        rankedItemRepository.deleteById(rankedItemId);
    }

    public List<RankedItem> getAllInRanking(Long rankingId) throws EntityNotFoundException {
        Ranking ranking = rankingRepository.findById(rankingId).orElseThrow(EntityNotFoundException::new);
        return ranking.getRankedItems();
    }

    public List<RankedItem> updateRankedItems(List<RankedItem> rankedItems){
        for(RankedItem rankedItem:rankedItems){
            addRankedItem(rankedItem);
            //rankedItemRepository.save(rankedItem);
        }
        return rankedItems;
    }
}
