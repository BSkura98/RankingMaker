package com.bartlomiejskura.rankingmaker.service;

import com.bartlomiejskura.rankingmaker.exception.EntityNotFoundException;
import com.bartlomiejskura.rankingmaker.model.Item;
import com.bartlomiejskura.rankingmaker.model.Ranking;
import com.bartlomiejskura.rankingmaker.model.RankingGroup;
import com.bartlomiejskura.rankingmaker.repository.ItemRepository;
import com.bartlomiejskura.rankingmaker.repository.RankingGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private RankingGroupRepository rankingGroupRepository;

    public Item addItem(Item item){
        return itemRepository.save(item);
    }

    public Item getItem(Long itemId) throws EntityNotFoundException {
        return itemRepository.findById(itemId).orElseThrow(EntityNotFoundException::new);
    }

    public List<Item> getAll(){
        return itemRepository.findAll();
    }

    public Item editItem(Item item){
        return itemRepository.save(item);
    }

    public void deleteItem(Long itemId){
        itemRepository.deleteById(itemId);
    }

    public List<Item> updateItems(List<Item> items){
        for(Item item:items){
            itemRepository.save(item);
        }
        return items;
    }

    public List<Item> getAllInGroup(Long rankingGroupId) throws EntityNotFoundException {
        RankingGroup rankingGroup = rankingGroupRepository.findById(rankingGroupId).orElseThrow(EntityNotFoundException::new);
        return rankingGroup.getItems();
    }
}
