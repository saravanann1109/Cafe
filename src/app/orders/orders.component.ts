import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OrderService } from '../service/manage-orders.service';
import { OrderForm, OrderStatus, OrderDetail } from '../model/order-form';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrdersComponent implements OnInit {
  cols: any[];
  orderDetailCol: any[];
  orders: OrderForm[] = [];
  items: OrderDetail[];
  orderStatus: OrderStatus;
  display: boolean = false;
  constructor(private commonService:CommonService, private orderService: OrderService) { }

  ngOnInit() {
    this.display = false;
    this.orderService.getOrders().subscribe((orderForms: OrderForm[]) => {
      this.orders = orderForms;
    })
    this.cols = [
      { field: 'Id', header: 'Order ID' },
      { field: 'Status', header: 'OrderStatus' },
      { field: 'CreatedDate', header: 'Created At' },
      { field: 'OrderedBy', header: 'Customer Name' },
      { field: 'TotalAmount', header: 'Total' },
      { field: 'Actions', header: 'Actions' },
    ];
    this.orderDetailCol = [
      {
        field: 'ItemCode', header: 'Code'
      },
      {
        field: 'ItemName', header: 'Name'
      },
      {
        field: 'ItemCost', header: 'Cost'
      },
      {
        field: 'Quantity', header: 'Quantity'
      },
      {
        field: 'Amount', header: 'Amount'
      }
    ]
  }

  /**
   * get order count based on the order status
   * @param status specify the status
   */
  getCountofOrderByStatus(status: string) {
    if (this.orders) {
      let orders = this.orders.filter(x => x.Status === status);
      return orders.length;
    }
  }

  /**
   * view the order detailes from the order.
   * @param rowData specify the row data.
   */
  viewDetails(rowData: any) {
    if (rowData) {
      let order = this.orders.filter(x => x.Id === rowData.Id);
      if (order)
        this.items = order[0].OrderedList;
      this.orderStatus = order[0].Status;
    }
    this.display = true;
  }

  /**
   * get the total amount from the order.
   */
  getTotalAmount() {
    let amount: number = 0;
    if (this.items) {
      this.items.forEach((x: OrderDetail) => {
        amount = amount + (x.ItemCost * x.Quantity);
      });
    }
    return amount;
  }
  /**
   * get the status for the order.
   */
  getStatus() {
    if (this.orderStatus)
      return this.orderStatus;
  }

  /**
   * change the status of the order based on the user action
   * @param status specify the status.
   * @param rowData specify the row data.
   */
  changeStatus(status: string, rowData: any) {
    if (status && rowData) {
      let index = this.orders.findIndex(x => x.Id == rowData.Id);
      if (index > -1) {
        this.orders[index].ModifiedBy = (this.commonService.getUser() !== null) ? this.commonService.getUser().UserName : null;
        switch (status) {
          case "Rejected":
            this.orders[index].Status = OrderStatus.Rejected;
            this.orderService.updateOrderStatus(this.orders[index]).subscribe((response:any)=>{
              this.commonService.emitMessage('success',this.orders[index].Id + 'is rejected',this.orders[index].Id + 'is rejected');
            });
            break;
          case "Accepted":
            this.orders[index].Status = OrderStatus.Accepted;
            this.orderService.updateOrderStatus(this.orders[index]).subscribe((response:any)=>{
              this.commonService.emitMessage('success',this.orders[index].Id + 'is accepted',this.orders[index].Id + 'is accepted');
            });
            break;
          case "Delivered":
            this.orders[index].Status = OrderStatus.Delivered;
            this.orderService.updateOrderStatus(this.orders[index]).subscribe((response:any)=>{
              this.commonService.emitMessage('success',this.orders[index].Id + 'is delivered',this.orders[index].Id + 'is delivered');
            });
            break;
        }
      }
    }
  }
}
