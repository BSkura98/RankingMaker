package com.bartlomiejskura.rankingmaker.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long ID;

    private String name;
    private String description;

    @ManyToOne
    @JsonIgnoreProperties({"rankings", "items"})
    @JoinColumn(name = "ranking_group_id")
    private RankingGroup rankingGroup;

    @OneToMany(mappedBy = "item")
    private List<RankedItem> rankedItems;

    public Item() {
    }

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<RankedItem> getRankedItems() {
        return rankedItems;
    }

    public void setRankedItems(List<RankedItem> rankedItems) {
        this.rankedItems = rankedItems;
    }

    public RankingGroup getRankingGroup() {
        return rankingGroup;
    }

    public void setRankingGroup(RankingGroup rankingGroup) {
        this.rankingGroup = rankingGroup;
    }
}
