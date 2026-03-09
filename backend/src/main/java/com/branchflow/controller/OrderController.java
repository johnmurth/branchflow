package com.branchflow.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    
    @GetMapping
    public List<Map<String, Object>> getOrders() {
        List<Map<String, Object>> orders = new ArrayList<>();
        
        // Order 1
        Map<String, Object> order1 = new HashMap<>();
        order1.put("id", 1);
        order1.put("customerName", "John Doe");
        order1.put("status", "PENDING");
        order1.put("total", 45.50);
        
        List<Map<String, Object>> items1 = new ArrayList<>();
        Map<String, Object> item1 = new HashMap<>();
        item1.put("id", 101);
        item1.put("name", "Burger");
        item1.put("quantity", 2);
        item1.put("price", 12.99);
        items1.add(item1);
        
        Map<String, Object> item2 = new HashMap<>();
        item2.put("id", 102);
        item2.put("name", "Fries");
        item2.put("quantity", 1);
        item2.put("price", 4.99);
        items1.add(item2);
        
        order1.put("items", items1);
        orders.add(order1);
        
        // Order 2
        Map<String, Object> order2 = new HashMap<>();
        order2.put("id", 2);
        order2.put("customerName", "Jane Smith");
        order2.put("status", "PREPARING");
        order2.put("total", 32.75);
        
        List<Map<String, Object>> items2 = new ArrayList<>();
        Map<String, Object> item3 = new HashMap<>();
        item3.put("id", 103);
        item3.put("name", "Pizza");
        item3.put("quantity", 1);
        item3.put("price", 24.99);
        items2.add(item3);
        
        Map<String, Object> item4 = new HashMap<>();
        item4.put("id", 104);
        item4.put("name", "Soda");
        item4.put("quantity", 2);
        item4.put("price", 2.50);
        items2.add(item4);
        
        order2.put("items", items2);
        orders.add(order2);
        
        return orders;
    }
    
    @GetMapping("/{id}")
    public Map<String, Object> getOrder(@PathVariable Long id) {
        Map<String, Object> order = new HashMap<>();
        order.put("id", id);
        order.put("customerName", "Customer " + id);
        order.put("status", "PENDING");
        order.put("total", 25.99);
        
        List<Map<String, Object>> items = new ArrayList<>();
        Map<String, Object> item = new HashMap<>();
        item.put("id", 100 + id);
        item.put("name", "Product " + id);
        item.put("quantity", 1);
        item.put("price", 25.99);
        items.add(item);
        
        order.put("items", items);
        return order;
    }
    
    @PostMapping
    public Map<String, Object> createOrder(@RequestBody Map<String, Object> order) {
        Map<String, Object> response = new HashMap<>();
        response.put("id", 3);
        response.put("message", "Order created successfully");
        response.put("order", order);
        return response;
    }
}