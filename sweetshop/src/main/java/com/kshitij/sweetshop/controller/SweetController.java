package com.kshitij.sweetshop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.kshitij.sweetshop.model.Sweet;
import com.kshitij.sweetshop.service.SweetService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sweets")
public class SweetController {
    private final SweetService service;

    public SweetController(SweetService service) {
        this.service = service;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Sweet> add(@RequestBody Sweet sweet) {
        return ResponseEntity.ok(service.addSweet(sweet));
    }

    @GetMapping
    public ResponseEntity<List<Sweet>> list() {
        return ResponseEntity.ok(service.listSweets());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Sweet>> search(@RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {
        if (name != null)
            return ResponseEntity.ok(service.searchByName(name));
        if (category != null)
            return ResponseEntity.ok(service.searchByCategory(category));
        if (minPrice != null || maxPrice != null)
            return ResponseEntity.ok(service.searchByPriceRange(minPrice, maxPrice));
        return ResponseEntity.ok(service.listSweets());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Sweet> update(@PathVariable Long id, @RequestBody Sweet sweet) {
        return ResponseEntity.ok(service.updateSweet(id, sweet));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.deleteSweet(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/purchase")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> purchase(
            @PathVariable Long id,
            @RequestParam(defaultValue = "1") int q) {

        Sweet updated = service.purchase(id, q);

        return ResponseEntity.ok(
                Map.of(
                        "message", "Purchase successful",
                        "id", updated.getId(),
                        "newQuantity", updated.getQuantity()));
    }

    @PostMapping("/{id}/restock")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> restock(
            @PathVariable Long id,
            @RequestParam int q) {

        Sweet updated = service.restock(id, q);

        return ResponseEntity.ok(
                Map.of(
                        "message", "Restocked successfully",
                        "id", updated.getId(),
                        "newQuantity", updated.getQuantity()));
    }

}
