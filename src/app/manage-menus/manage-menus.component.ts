import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ItemMaster } from '../model/item-master';
import { ItemService } from '../service/item.service';
import { AdministrationService } from '../service/administration.service';

@Component({
  selector: 'app-manage-menus',
  templateUrl: './manage-menus.component.html',
  styleUrls: ['./manage-menus.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManageMenusComponent implements OnInit {
  public itemsList: ItemMaster[] = [];
  cols: any[];
  isNewItem: boolean;
  selectedItem: ItemMaster;
  item: ItemMaster;
  displayDialog: boolean;
  constructor(private adminService: AdministrationService) { }

  ngOnInit() {
    this.displayDialog = false;
    this.isNewItem = true;
    this.adminService.getItems().subscribe((items: ItemMaster[]) => {
      if (items) {
        this.itemsList = items;
      }
      else {
        this.itemsList = [];
      }
    });

    this.cols = [
      { field: 'Id', header: 'Menu #' },
      { field: 'Name', header: 'Name' },
      { field: 'Code', header: 'Code' },
      { field: 'Cost', header: 'Amount' },
      {field:'IsActive',header:'IsActive'}
    ];
  }

  /**
   * on row selecting user detail shown in dialog box.
   * @param event specufy the event.
   */
  onRowSelect(event) {
    this.item = this.cloneItem(event.data);
    this.isNewItem = false;
    this.displayDialog = true;
  }

  /**
   * clone the user object without changing the users array.
   * @param user specify the user.
   */
  cloneItem(item: ItemMaster): ItemMaster {
    let ItemDetails = new ItemMaster();
    for (let prop in item) {
      ItemDetails[prop] = item[prop];
    }
    return ItemDetails;
  }

  /**
   * showing the dialog box.
   */
  showDialogToAdd() {
    this.item = new ItemMaster();
    this.isNewItem = true;
    this.displayDialog = true;
  }

  /**
   * Save, Delete or Add functionality based on the user action type.
   * @param type specify the type of the action.
   */
  SaveOrDelete(type: string) {
    if (this.item && this.item.Code != null) {
      let index = this.itemsList.findIndex(x => x.Code == this.item.Code);
      switch (type) {
        case "add":
          this.itemsList.push(this.item);
          break;
        case "save":
          if (index > -1)
            this.itemsList[index] = this.item;
          break;
        case "delete":
          if (index > -1)
            this.itemsList.splice(index, 1);
          break;
      }
      this.item = new ItemMaster();
      this.displayDialog = false;
    }
  }
}
