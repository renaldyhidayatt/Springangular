package com.fullangular.fullagular.controller;

import com.fullangular.fullagular.dto.Purchase;
import com.fullangular.fullagular.dto.PurchaseResponse;
import com.fullangular.fullagular.service.CheckoutService;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {

        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

        return purchaseResponse;
    }

}