package com.bartlomiejskura.rankingmaker.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "ranking_groups")
public class RankingGroup {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long ID;

    private String name;

    @OneToMany(mappedBy = "rankingGroup")
    @JsonIgnoreProperties({"rankingGroup"})
    private List<Ranking> rankings;

    @OneToMany(mappedBy = "rankingGroup")
    @JsonIgnoreProperties({"rankingGroup"})
    private List<Item> items;

    public RankingGroup() {
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

    public List<Ranking> getRankings() {
        return rankings;
    }

    public void setRankings(List<Ranking> rankings) {
        this.rankings = rankings;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
}
