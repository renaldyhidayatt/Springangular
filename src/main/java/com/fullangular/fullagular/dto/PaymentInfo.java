package com.fullangular.fullagular.dto;

import lombok.Data;

@Data
public class PaymentInfo {
    private int amount;
    private String curreny;
    private String receptEmail;
}
