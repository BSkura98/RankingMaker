package com.bartlomiejskura.rankingmaker.service;

import com.bartlomiejskura.rankingmaker.exception.EntityNotFoundException;
import com.bartlomiejskura.rankingmaker.model.Item;
import com.bartlomiejskura.rankingmaker.model.RankedItem;
import com.bartlomiejskura.rankingmaker.model.RankingGroup;
import com.bartlomiejskura.rankingmaker.repository.ItemRepository;
import com.bartlomiejskura.rankingmaker.repository.RankedItemRepository;
import com.bartlomiejskura.rankingmaker.repository.RankingGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private RankedItemRepository rankedItemRepository;

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

    public void deleteItem(Long itemId) throws EntityNotFoundException {
        Item item = itemRepository.findById(itemId).orElseThrow(EntityNotFoundException::new);
        rankedItemRepository.deleteAll(item.getRankedItems());
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

    public List<Item> getAllInGroupNotBelongingToRanking(Long rankingGroupId, Long rankingId) throws EntityNotFoundException {
        RankingGroup rankingGroup = rankingGroupRepository.findById(rankingGroupId).orElseThrow(EntityNotFoundException::new);
        List<Item> items = rankingGroup.getItems();
        List<Item> newItems = new ArrayList<>();
        boolean itemBelongs;
        for(Item item:items){
            List<RankedItem> rankedItems = item.getRankedItems();
            itemBelongs = false;
            for(RankedItem rankedItem:rankedItems){
                if(rankedItem.getRanking().getID().equals(rankingId)){
                    itemBelongs = true;
                }
            }
            if(!itemBelongs){
                newItems.add(item);
            }
        }
        return newItems;
    }
}
