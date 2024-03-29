/*
Copyright 2019 - 2021 VMware, Inc.
SPDX-License-Identifier: Apache-2.0
*/


package com.vmware.tanzu.gemfire.cacheaside.controllers;

import com.vmware.tanzu.gemfire.cacheaside.domain.BikeIncident;
import com.vmware.tanzu.gemfire.cacheaside.services.BikeIncidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Controller
public class ViewController {
    @Autowired
    BikeIncidentService bikeIncidentService;

    private List<String> responseTimes = new ArrayList<>();

    @GetMapping("/")
    public String homePage(Model model) {
        model.addAttribute("zipCode");
        return "home";
    }

    @PostMapping("/")
    public String requestIncidents(
            @RequestParam String zipCode,
            Model model) throws IOException {

        long timeStampBeforeQuery = System.currentTimeMillis();
        List<BikeIncident> bikeIncidents =
                bikeIncidentService.getBikeIncidents(zipCode);
        long timeElapsed = System.currentTimeMillis() - timeStampBeforeQuery;

        recordNewDataRequest(timeElapsed, zipCode);
        populateModelWithSearchResults(model, bikeIncidents, zipCode);

        return "home";
    }

    private void recordNewDataRequest(long timeElapsed, String zipCode) {
        responseTimes.add( "Zip Code: " + zipCode + ", Response Time: " + timeElapsed + " ms");
    }

    private void populateModelWithSearchResults(Model model, List<BikeIncident> bikeIncidents, String zipCode) {
        model.addAttribute("zipCode", zipCode);
        model.addAttribute("responseTimes", responseTimes);
        model.addAttribute("bikeIncidents", bikeIncidents);
    }
}
