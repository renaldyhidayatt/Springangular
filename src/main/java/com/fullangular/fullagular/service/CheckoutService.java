package com.fullangular.fullagular.service;

import com.fullangular.fullagular.dto.*;

public interface CheckoutService{

    PurchaseResponse placeOrder(Purchase purchase);
}