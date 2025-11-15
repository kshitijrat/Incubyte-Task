package com.kshitij.sweetshop.service.impl;

import org.springframework.stereotype.Service;

import com.kshitij.sweetshop.model.Sweet;
import com.kshitij.sweetshop.repository.SweetRepo;
import com.kshitij.sweetshop.service.SweetService;

import java.util.List;

@Service
public class SweetServiceImpl implements SweetService {
    private final SweetRepo repo;

    public SweetServiceImpl(SweetRepo repo) {
        this.repo = repo;
    }

    @Override
    public Sweet addSweet(Sweet sweet) {
        return repo.save(sweet);
    }

    @Override
    public List<Sweet> listSweets() {
        return repo.findAll();
    }

    @Override
    public List<Sweet> searchByName(String name) {
        return repo.findByNameContainingIgnoreCase(name);
    }

    @Override
    public List<Sweet> searchByCategory(String category) {
        return repo.findByCategoryIgnoreCase(category);
    }

    @Override
    public List<Sweet> searchByPriceRange(Double min, Double max) {
        return repo.findByPriceRange(min, max);
    }

    @Override
    public Sweet updateSweet(Long id, Sweet sweet) {
        Sweet existing = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
        existing.setName(sweet.getName());
        existing.setCategory(sweet.getCategory());
        existing.setPrice(sweet.getPrice());
        existing.setQuantity(sweet.getQuantity());
        return repo.save(existing);
    }

    @Override
    public void deleteSweet(Long id) {
        repo.deleteById(id);
    }

    @Override
    public Sweet purchase(Long id, int quantity) {
        Sweet s = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
        if (s.getQuantity() < quantity)
            throw new IllegalArgumentException("Insufficient stock");
        s.setQuantity(s.getQuantity() - quantity);
        return repo.save(s);
    }

    @Override
    public Sweet restock(Long id, int q) {
    Sweet s = repo.findById(id).orElseThrow();
    s.setQuantity(s.getQuantity() + q);
    return repo.save(s);
}

}
