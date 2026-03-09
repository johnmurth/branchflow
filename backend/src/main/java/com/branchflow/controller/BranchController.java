package com.branchflow.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/branches")
public class BranchController {
    
    @GetMapping
    public List<Map<String, Object>> getBranches() {
        List<Map<String, Object>> branches = new ArrayList<>();
        
        // Branch 1
        Map<String, Object> branch1 = new HashMap<>();
        branch1.put("id", 1);
        branch1.put("name", "Downtown Branch");
        branch1.put("address", "123 Main Street, Downtown");
        branch1.put("phone", "555-0101");
        branch1.put("status", "OPEN");
        branches.add(branch1);
        
        // Branch 2
        Map<String, Object> branch2 = new HashMap<>();
        branch2.put("id", 2);
        branch2.put("name", "Uptown Branch");
        branch2.put("address", "456 High Avenue, Uptown");
        branch2.put("phone", "555-0102");
        branch2.put("status", "BUSY");
        branches.add(branch2);
        
        // Branch 3
        Map<String, Object> branch3 = new HashMap<>();
        branch3.put("id", 3);
        branch3.put("name", "Airport Branch");
        branch3.put("address", "789 Terminal Road, Airport");
        branch3.put("phone", "555-0103");
        branch3.put("status", "CLOSED");
        branches.add(branch3);
        
        return branches;
    }
    
    @GetMapping("/{id}")
    public Map<String, Object> getBranch(@PathVariable Long id) {
        Map<String, Object> branch = new HashMap<>();
        branch.put("id", id);
        branch.put("name", "Branch " + id);
        branch.put("address", id + " Sample Street");
        branch.put("phone", "555-0" + id);
        branch.put("status", id == 1 ? "OPEN" : id == 2 ? "BUSY" : "CLOSED");
        return branch;
    }
}