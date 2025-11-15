package com.kshitij.sweetshop.service;
import java.util.List;

import com.kshitij.sweetshop.model.Sweet;
public interface SweetService {
    Sweet addSweet(Sweet sweet);
    List<Sweet> listSweets();
    List<Sweet> searchByName(String name);
    List<Sweet> searchByCategory(String category);
    List<Sweet> searchByPriceRange(Double min, Double max);
    Sweet updateSweet(Long id, Sweet sweet);
    void deleteSweet(Long id);
    Sweet purchase(Long id, int quantity);
    Sweet restock(Long id, int quantity);
}
