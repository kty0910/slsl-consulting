package com.example.slsl_server.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Power {
    @Id
    private Long index;

    @Column(columnDefinition="TEXT")
    private String loc;
    private LocalDate tm;
    private double value;
}
