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

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = "items", allowSetters = true)
    @JoinTable(name="ranking_item",
            joinColumns = {@JoinColumn(name="itemId")},
            inverseJoinColumns = {@JoinColumn(name="rankingId")})
    private List<Ranking> rankings;

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

    public List<Ranking> getRankings() {
        return rankings;
    }

    public void setRankings(List<Ranking> rankings) {
        this.rankings = rankings;
    }
}
