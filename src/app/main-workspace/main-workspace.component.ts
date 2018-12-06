import { Component, OnInit } from '@angular/core';
import { ItemService } from '../service/item.service'
import { ItemMaster, addOrDelete } from '../model/item-master';
import { OrderForm, OrderDetail } from '../model/order-form';

@Component({
  selector: 'app-main-workspace',
  templateUrl: './main-workspace.component.html',
  styleUrls: ['./main-workspace.component.css']
})
export class MainWorkspaceComponent implements OnInit {
  private items: ItemMaster[] = [];
  private orderForm: OrderForm;
  private count: number = 0;
  constructor(private itemService: ItemService) { }
  ngOnInit() {
    this.itemService.switchComponent("MainComponent");
    this.orderForm = new OrderForm();
    this.itemService.getItems().subscribe((item: ItemMaster[]) => {
      this.items = item;
      if (this.itemService.order && this.itemService.order.OrderedList.length > 0) {
        this.orderForm = this.itemService.order;
        this.itemService.order.OrderedList.forEach((items: OrderDetail) => {
          let index = this.items.findIndex(x => x.Name === items.ItemName && x.Code === items.ItemCode);
          if (index > -1) {

            this.items[index].Quantity = items.Quantity;
          }
        });
      }
      this.itemService.addItem(this.itemService.getQuantity() > 0 ? this.itemService.getQuantity() : 0);
    });


  }

  /**
   * add items to the cart.
   * @param item  specify the item master.
   */
  addItem(item: ItemMaster) {
    this.addOrDeleteItem(item, addOrDelete.add);
    this.count = this.itemService.getQuantity() > 0 ? this.itemService.getQuantity() : 0;
    this.itemService.addItem(this.count);
  }

  /**
   * delete item from the cart.
   * @param item specify the item.
   */
  deleteItem(item: ItemMaster) {
    if (item.Quantity > 0) {
      this.addOrDeleteItem(item, addOrDelete.delete);
      this.count = this.itemService.getQuantity() > 0 ? this.itemService.getQuantity() : 0;
      this.itemService.addItem(this.count);
    }
  }

  /**
   * add or delete from from the order form.
   * @param item specify the item to add or delete.
   * @param addDeleteType type to be delete or add.
   */
  addOrDeleteItem(item: ItemMaster, addDeleteType: addOrDelete) {
    let details: OrderDetail = new OrderDetail();

    if (this.itemService.order.OrderedList.findIndex((x => x.ItemCode === item.Code)) > -1) {
      let orderItem: OrderDetail = this.itemService.order.OrderedList[this.itemService.order.OrderedList.findIndex((x => x.ItemCode === item.Code))];
      if (orderItem) {
        orderItem.Quantity = addDeleteType === addOrDelete.delete ? orderItem.Quantity - 1 : orderItem.Quantity + 1;
        orderItem.Amount = orderItem.Quantity * orderItem.ItemCost;
        this.itemService.addItemToOrderList(orderItem, addOrDelete.replace);
      }

    }
    else {
      details.ItemName = item.Name;
      details.ItemCode = item.Code;
      details.ItemCost = item.Cost;
      details.Quantity = addDeleteType === addOrDelete.delete ? details.Quantity - 1 : details.Quantity + 1;
      details.Amount = details.Quantity * details.ItemCost;
      this.itemService.addItemToOrderList(details, addOrDelete.replace);
    }
    let index = this.items.findIndex((x => x.Code === item.Code));
    if (index > -1) {
      this.items[index].Quantity = addDeleteType === addOrDelete.delete ? this.items[index].Quantity - 1 : this.items[index].Quantity + 1;
    }
  }

  getTitle(itemName: string, itemCost: number) {
    return itemName.concat(' - Rs.' + itemCost);
  }
}
