package com.bartlomiejskura.rankingmaker.service;

import com.bartlomiejskura.rankingmaker.exception.EntityNotFoundException;
import com.bartlomiejskura.rankingmaker.model.Item;
import com.bartlomiejskura.rankingmaker.model.RankedItem;
import com.bartlomiejskura.rankingmaker.repository.ItemRepository;
import com.bartlomiejskura.rankingmaker.repository.RankedItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RankedItemService {
    @Autowired
    private RankedItemRepository rankedItemRepository;

    @Autowired
    private ItemRepository itemRepository;

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
}
