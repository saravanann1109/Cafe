import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderForm } from '../model/order-form';

@Injectable()
export class OrderService {
    configUrl = 'http://localhost:3000/';
    constructor(private http: HttpClient) {
    }

    /**
     * get orders from the API.
     */
    getOrders() {
        return this.http.get(this.configUrl + 'orders');
    }

    getOrderById(id: string) {
      return this.http.get(this.configUrl + 'orders/' + id);
    }

    updateOrderStatus(order:OrderForm)
    {
        return this.http.put(this.configUrl + 'orders/'+ order.Id,order);
    }
}