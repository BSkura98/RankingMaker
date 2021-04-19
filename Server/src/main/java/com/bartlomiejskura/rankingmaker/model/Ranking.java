package com.bartlomiejskura.rankingmaker.model;

import javax.persistence.*;

@Entity
@Table(name = "rankings")
public class Ranking {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long ID;

    private String name;

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
}
