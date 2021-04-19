package com.bartlomiejskura.rankingmaker.controller;

import com.bartlomiejskura.rankingmaker.exception.EntityNotFoundException;
import com.bartlomiejskura.rankingmaker.model.Item;
import com.bartlomiejskura.rankingmaker.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemController {
    @Autowired
    private ItemService itemService;

    @GetMapping("/getAll")
    public List<Item> getAll(){
        return itemService.getAll();
    }

    @PostMapping
    public Item addItem(@RequestBody Item item){
        return itemService.addItem(item);
    }

    @GetMapping
    public Item getItem(@RequestParam(name="itemId")Long itemId){
        try {
            return itemService.getItem(itemId);
        } catch (EntityNotFoundException e) {
            return null;
        }
    }

    @PutMapping
    public Item editItem(@RequestBody Item item){
        return itemService.editItem(item);
    }

    @DeleteMapping
    public void deleteItem(@RequestParam(name="itemId")Long itemId){
        itemService.deleteItem(itemId);
    }
}
