package com.fullangular.fullagular.dto;

import com.fullangular.fullagular.entity.*;


import lombok.Data;


import java.util.Set;

@Data
public class Purchase{
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}