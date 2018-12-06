import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderForm, OrderDetail } from '../model/order-form';
import { Message } from '../model/message';
import { addOrDelete } from '../model/item-master';

@Injectable()
export class ItemService {
    configUrl = 'assets/json/items.json';
    public addItemListener: EventEmitter<any> = null;
    public componentListener: EventEmitter<string> = null;
    public message: EventEmitter<Message> = null;
    public order: OrderForm = null;
    constructor(private http: HttpClient) {
        this.addItemListener = new EventEmitter<any>();
        this.componentListener = new EventEmitter<string>();
        this.order = new OrderForm();
        this.message = new EventEmitter<Message>();
    }

    /**
     * get Items from the API.
     */
    getItems() {
        return this.http.get(this.configUrl);
    }
    
    /**
     * for displaying count to the count icon
     * @param count specify the count 
     */
    addItem(count: number) {
        if (count !== null || count !== undefined) {
            this.addItemListener.emit(count);
        }
    }

    /**
     * add or delete items to the order list
     * @param item specify the item
     * @param addDelete specify the add delete enum type.
     */
    addItemToOrderList(item: OrderDetail, addDelete: addOrDelete) {
        if (addDelete == addOrDelete.add) {
            this.order.OrderedList.push(item);
        }
        if (addDelete == addOrDelete.delete) {
            let counter = this.order.OrderedList.findIndex((x => x.ItemName === item.ItemName && x.ItemCode === item.ItemCode && x.Quantity === 0));
            if (counter > -1)
                this.order.OrderedList.splice(counter, 1);
        }
        if (addDelete == addOrDelete.replace) {
            if (this.order.OrderedList.findIndex((x => x.ItemCode === item.ItemCode)) > -1) {
                this.order.OrderedList[this.order.OrderedList.findIndex((x => x.ItemCode === item.ItemCode))] = item;

            }
            else {
                this.order.OrderedList.push(item);
            }
        }
    }

    /**
     * get the order form.
     */
    getOrderForm() {
        this.refreshData();
        return this.order;
    }

    /**
     * Switch the components for replacing the cart or home icon
     * @param name specify the component name.
     */
    switchComponent(name: string) {
        this.componentListener.emit(name);
    }

    /**
     * place the order.
     */
    placeOrder() {
        this.refreshData();
        return true;
    }

    /**
     * clear the order form after order getting placed.
     */
    clearOrderForm() {
        this.order = null;
    }

    /**
       * get quantity of the items from the orderform.
       */
    getQuantity() {
        let quantity: number = 0;
        this.order.OrderedList.forEach((item: OrderDetail) => {
            quantity = quantity + item.Quantity;
        });
        return quantity;
    }

    /**
     * refresh the data from order list if the order item quantity is equal to zero.
     */
    refreshData() {
        let orders: OrderDetail[] = [];
        Object.assign(orders, this.order.OrderedList);
        if (orders) {
            orders.forEach((item: OrderDetail) => {
                let counter = this.order.OrderedList.findIndex((x => x.ItemName === item.ItemName && x.ItemCode === item.ItemCode && x.Quantity === 0));
                if (counter > -1)
                    this.order.OrderedList.splice(counter, 1);
            });

        }
    }
}