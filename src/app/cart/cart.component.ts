import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ItemService } from '../service/item.service';
import { OrderForm, OrderDetail } from '../model/order-form';
import { Message } from '../model/message';
import { Router } from "@angular/router"

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {
  orderForm: OrderForm;
  OrderList: OrderDetail[] = [];
  displayDialog: boolean;
  item: OrderDetail;
  selectedItem: OrderDetail;
  cols: any[];
  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit() {
    this.itemService.switchComponent("CartComponent");
    this.displayDialog = false;
    this.item = new OrderDetail();
    if (this.itemService.getOrderForm()) {

      this.orderForm = this.itemService.getOrderForm();
      this.OrderList = this.orderForm.OrderedList;
    }
    else {
      this.orderForm = new OrderForm();
    }
    this.cols = [
      { field: 'ItemName', header: 'Item' },
      { field: 'ItemCost', header: 'Item Cost' },
      { field: 'Quantity', header: 'Quantity' },
      { field: 'Amount', header: 'Amount' }
    ];
  }

  onRowSelect(event) {
    this.item = this.cloneItem(event.data);
    this.displayDialog = true;
  }
  cloneItem(c: OrderDetail): OrderDetail {
    let ItemDetails = new OrderDetail();
    for (let prop in c) {
      ItemDetails[prop] = c[prop];
    }
    return ItemDetails;
  }

  save(itemCode: string, itemName: string, quantity: number) {

    if (this.OrderList) {
      let counter = this.OrderList.findIndex((x => x.ItemName === itemName && x.ItemCode === itemCode));
      if (counter > -1)
        this.OrderList[counter].Quantity = parseInt(quantity.toString());
      this.OrderList[counter].Amount = this.OrderList[counter].Quantity * this.OrderList[counter].ItemCost;
    }
    this.displayDialog = false;
  }

  delete(itemCode: string, itemName: string) {
    if (this.OrderList) {
      let counter = this.OrderList.findIndex((x => x.ItemName === itemName && x.ItemCode === itemCode));
      if (counter > -1)
        this.OrderList.splice(counter, 1);
    }
    this.displayDialog = false;
  }

  placeOrder() {
    if (this.orderForm && this.OrderList) {
      this.itemService.placeOrder();
      let message = new Message("Order Placed", "Your order is placed successfully!!!.");
      this.itemService.message.emit(message);
      this.itemService.addItemListener.emit(0);
      this.itemService.clearOrderForm();
      this.router.navigate(['/']);
    }
  }
}
