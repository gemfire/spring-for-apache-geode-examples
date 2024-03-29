/*
Copyright 2019 - 2021 VMware, Inc.
SPDX-License-Identifier: Apache-2.0
*/


package com.vmware.tanzu.gemfire.cacheaside.services;

import com.vmware.tanzu.gemfire.cacheaside.CacheAsideApplication;
import com.vmware.tanzu.gemfire.cacheaside.domain.BikeIncident;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cache.CacheManager;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.client.ExpectedCount;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.util.ResourceUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.support.RestGatewaySupport;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = CacheAsideApplication.class)
public class BikeIncidentServiceTest {
    @Autowired
    RestTemplate restTemplate;

    @Autowired
    BikeIncidentService bikeIncidentService;

    @Autowired
    CacheManager cacheManager;

    private MockRestServiceServer mockRestServer;

    @Value("${bikewise.api.url}")
    private String API_URL;

    private final String ZIP_CODE_30306 = "30306";
    private final String ZIP_CODE_97007 = "97007";

    private String mockIncidentsJsonForZipcode_30306;
    private String mockIncidentsJsonForZipcode_97007;

    @Before
    public void setUp() throws IOException {
        RestGatewaySupport gateway = new RestGatewaySupport();
        gateway.setRestTemplate(restTemplate);
        mockRestServer = MockRestServiceServer.createServer(gateway);

        File file_30306 =
                ResourceUtils.getFile("src/test/java/resources/mockIncidentsJsonForZipcode_30306.json");
        mockIncidentsJsonForZipcode_30306 = new String(Files.readAllBytes(file_30306.toPath()));
        File file_97007 =
                ResourceUtils.getFile("src/test/java/resources/mockIncidentsJsonForZipcode_97007.json");
        mockIncidentsJsonForZipcode_97007 = new String(Files.readAllBytes(file_97007.toPath()));
    }

    @Test

    public void getBikeIncidents_ShouldReturnIncidentsOccurringWithinSpecifiedZipCode_GivenZipcode()
            throws IOException {
        mockRestServer.expect(ExpectedCount.once(), requestTo(API_URL + ZIP_CODE_30306))
                .andRespond(withSuccess(mockIncidentsJsonForZipcode_30306, MediaType.APPLICATION_JSON));
        mockRestServer.expect(ExpectedCount.once(), requestTo(API_URL + ZIP_CODE_97007))
                .andRespond(withSuccess(mockIncidentsJsonForZipcode_97007, MediaType.APPLICATION_JSON));

        List<BikeIncident> resultsFor_30306 =
                bikeIncidentService.getBikeIncidents(ZIP_CODE_30306);
        List<BikeIncident> resultsFor_97007 =
                bikeIncidentService.getBikeIncidents(ZIP_CODE_97007);

        mockRestServer.verify();
        assertEquals(4, resultsFor_30306.size());
        assertEquals(1, resultsFor_97007.size());
    }

    @Test
    @DirtiesContext
    public void getBikeIncidents_ShouldPullFromCache_AfterFirstResult() throws IOException {
        mockRestServer.expect(ExpectedCount.once(), requestTo(API_URL + ZIP_CODE_30306))
                .andRespond(withSuccess(mockIncidentsJsonForZipcode_30306, MediaType.APPLICATION_JSON));

        List<BikeIncident> resultsFor_30306_fromApi =
                bikeIncidentService.getBikeIncidents(ZIP_CODE_30306);
        List<BikeIncident> resultsFor_30306_fromCache =
                bikeIncidentService.getBikeIncidents(ZIP_CODE_30306);

        mockRestServer.verify();
        assertEquals(resultsFor_30306_fromApi,
                cacheManager.getCache("BikeIncidentsByZip").get(ZIP_CODE_30306).get());
        assertEquals(resultsFor_30306_fromApi, resultsFor_30306_fromCache);
    }
}