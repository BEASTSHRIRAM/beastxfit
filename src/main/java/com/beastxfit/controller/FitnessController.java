package com.beastxfit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.beastxfit.model.User;
import com.beastxfit.service.FitnessService;
import java.util.Map;

@RestController
@RequestMapping("/api/fitness")
@CrossOrigin(origins = "*")
public class FitnessController {

    @Autowired
    private FitnessService fitnessService;

    @PostMapping("/calculate")
    public ResponseEntity<Map<String, Object>> calculateFitness(@RequestBody User user) {
        Map<String, Object> fitnessReport = fitnessService.getFitnessReport(user);
        return ResponseEntity.ok(fitnessReport);
    }
}