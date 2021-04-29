package com.bartlomiejskura.rankingmaker.service;

import com.bartlomiejskura.rankingmaker.exception.EntityNotFoundException;
import com.bartlomiejskura.rankingmaker.model.*;
import com.bartlomiejskura.rankingmaker.repository.ItemRepository;
import com.bartlomiejskura.rankingmaker.repository.RankedItemRepository;
import com.bartlomiejskura.rankingmaker.repository.RankingGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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

    public ItemStatistics getStatistics(Long itemId) throws EntityNotFoundException {
        Item item = itemRepository.findById(itemId).orElseThrow(EntityNotFoundException::new);
        List<Ranking> rankings = item.getRankingGroup().getRankings();
        rankings.sort((o1, o2) -> o1.getPosition() < o2.getPosition() ? -1 : 1);
        int highestPosition = Integer.MAX_VALUE;
        Ranking highestPositionRanking = null;
        Ranking firstRanking = null;
        Map<String, Integer> allPositions = new LinkedHashMap<>();
        int currentPosition;

        for(Ranking ranking:rankings){
            currentPosition = 0;
            for(RankedItem rankedItem:ranking.getRankedItems()){
                if(rankedItem.getItem().getID().equals(itemId)){
                    currentPosition=rankedItem.getPosition();
                    if(currentPosition<highestPosition){
                        highestPosition = currentPosition;
                        highestPositionRanking = ranking;
                    }
                    if(firstRanking==null){
                        firstRanking = ranking;
                    }
                    break;
                }
            }
            allPositions.put(ranking.getName(), currentPosition);
        }
        if(highestPosition==Integer.MAX_VALUE){
            highestPosition = 0;
        }

        ItemStatistics statistics = new ItemStatistics();
        statistics.setItem(item);
        statistics.setHighestPosition(highestPosition);
        statistics.setHighestPositionRanking(highestPositionRanking);
        statistics.setFirstRanking(firstRanking);
        statistics.setAllPositions(allPositions);
        return statistics;
    }
}
