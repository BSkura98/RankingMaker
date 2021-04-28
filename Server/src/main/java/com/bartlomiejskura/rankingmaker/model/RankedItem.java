package com.bartlomiejskura.rankingmaker.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "ranked_items")
public class RankedItem {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long ID;

    @ManyToOne
    @JsonIgnoreProperties({"rankedItems"})
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "ranking_id")
    private Ranking ranking;

    private Integer position;

    public RankedItem() {
    }

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public Ranking getRanking() {
        return ranking;
    }

    public void setRanking(Ranking ranking) {
        this.ranking = ranking;
    }
}
