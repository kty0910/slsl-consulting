package com.example.slsl_server.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.slsl_server.model.DummyPowerData;

@Repository
public interface DummyPowerDataRepository extends JpaRepository<DummyPowerData, Long> {
    // 입력 받은 지역에서 firstDate와 secondDate 사이의 데이터 검색
    List<DummyPowerData> findByLocAndDateBetween(String loc, LocalDate firstDate, LocalDate secondDate);

    // 지역 무관 firstDate와 secondDate 사이의 데이터를 검색 후 날짜를 기준으로 묶어서 전국 평균 발전량을 계산
    @Query(value =
        "SELECT date, AVG(value) as value " +
        "FROM dummy_power_data " +
        "WHERE `date` BETWEEN :firstDate AND :secondDate " +
        "GROUP BY `date`",
        nativeQuery = true
    )
    List<Map<String,Object>> findGroupByDateWithNativeQuery(
        @Param("firstDate") LocalDate firstDate,
        @Param("secondDate") LocalDate secondDate
    );
}