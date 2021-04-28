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
    private Integer position;

    @ManyToOne
    @JsonIgnoreProperties({"rankings", "items"})
    @JoinColumn(name = "ranking_group_id")
    private RankingGroup rankingGroup;

    @OneToMany(mappedBy = "ranking")
    @JsonIgnoreProperties({"ranking"})
    private List<RankedItem> rankedItems;

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

    public RankingGroup getRankingGroup() {
        return rankingGroup;
    }

    public void setRankingGroup(RankingGroup rankingGroup) {
        this.rankingGroup = rankingGroup;
    }

    public List<RankedItem> getRankedItems() {
        return rankedItems;
    }

    public void setRankedItems(List<RankedItem> rankedItems) {
        this.rankedItems = rankedItems;
    }

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }
}
