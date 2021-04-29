package com.bartlomiejskura.rankingmaker.model;

import java.util.Map;

public class ItemStatistics {
    private Item item;
    private Ranking firstRanking;
    private Integer highestPosition;
    private Ranking highestPositionRanking;
    private Map<String, Integer> allPositions;

    public ItemStatistics() {
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Ranking getFirstRanking() {
        return firstRanking;
    }

    public void setFirstRanking(Ranking firstRanking) {
        this.firstRanking = firstRanking;
    }

    public Integer getHighestPosition() {
        return highestPosition;
    }

    public void setHighestPosition(Integer highestPosition) {
        this.highestPosition = highestPosition;
    }

    public Ranking getHighestPositionRanking() {
        return highestPositionRanking;
    }

    public void setHighestPositionRanking(Ranking highestPositionRanking) {
        this.highestPositionRanking = highestPositionRanking;
    }

    public Map<String, Integer> getAllPositions() {
        return allPositions;
    }

    public void setAllPositions(Map<String, Integer> allPositions) {
        this.allPositions = allPositions;
    }
}
