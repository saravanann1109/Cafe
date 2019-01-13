import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ItemMaster } from '../model/item-master';
import { AdministrationService } from '../service/administration.service';
import { CommonService } from '../service/common.service';

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
  constructor(private adminService: AdministrationService, private commonService: CommonService) { }

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
      { field: 'IsActive', header: 'IsActive' }
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
    if (this.item && (this.item.Code != null && this.item.Code != undefined)) {
      let index = this.itemsList.findIndex(x => x.Code == this.item.Code);
      switch (type) {
        case "add":
          this.item.CreatedBy = (this.commonService.getUser() !== null) ? this.commonService.getUser().UserName : null;
          this.adminService.addItem(this.item).subscribe((response: any) => {
            this.item = response;
            this.itemsList.push(this.item);
            this.commonService.emitMessage('success', this.item.Name + ' ' + 'Added!!!', this.item.Name + ' is added successfully');
          })
          break;
        case "save":
          if (index > -1)
          this.item.ModifiedBy = (this.commonService.getUser() !== null) ? this.commonService.getUser().UserName : null;
            this.adminService.saveItem(this.item).subscribe((response: ItemMaster) => {
              this.itemsList[index] = response;
              this.commonService.emitMessage('success', this.item.Name + ' ' + 'Updated!!!', this.item.Name + ' is updated successfully');
            });
          break;
        case "delete":
          if (index > -1)
            this.adminService.deleteItem(this.item.Id).subscribe((response: ItemMaster) => {
              this.itemsList.splice(index, 1);
              this.commonService.emitMessage('success', this.item.Name + ' ' + 'Deleted!!!', this.item.Name + ' is deleted successfully')
            });
          break;
      }
      // this.item = new ItemMaster();
      this.displayDialog = false;
    }
  }
}
