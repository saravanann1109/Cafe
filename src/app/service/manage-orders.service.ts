import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrderService {
    configUrl = 'assets/json/orders.json';
    constructor(private http: HttpClient) {
    }

    /**
     * get orders from the API.
     */
    getOrders() {
        return this.http.get(this.configUrl);
    }
}