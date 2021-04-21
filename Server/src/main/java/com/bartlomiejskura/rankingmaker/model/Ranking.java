package com.bartlomiejskura.rankingmaker.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "rankings")
public class Ranking {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long ID;

    private String name;

    @OneToMany(mappedBy = "ranking")
    @JsonIgnoreProperties({"ranking"})
    private Set<Item> items;

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

    public Set<Item> getItems() {
        return items;
    }

    public void setItems(Set<Item> items) {
        this.items = items;
    }
}
