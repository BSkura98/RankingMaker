package com.bartlomiejskura.rankingmaker.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "rankings")
public class Ranking {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long ID;

    private String name;

    @ManyToOne
    @JoinColumn(name = "ranking_group_id")
    private RankingGroup rankingGroup;

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = "rankings", allowSetters = true)
    @JoinTable(name="ranking_item",
            joinColumns = {@JoinColumn(name="rankingId")},
            inverseJoinColumns = {@JoinColumn(name="itemId")})
    private List<Item> items;

    public Ranking() {
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

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public RankingGroup getRankingGroup() {
        return rankingGroup;
    }

    public void setRankingGroup(RankingGroup rankingGroup) {
        this.rankingGroup = rankingGroup;
    }
}
