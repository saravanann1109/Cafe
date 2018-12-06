import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManageusersComponent implements OnInit {
  public users: User[] = [];
  cols: any[];
  isNewUser: boolean;
  selectedItem: User;
  user: User;
  displayDialog: boolean;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.displayDialog = false;
    this.isNewUser = true;
    this.userService.getItems().subscribe((users: User[]) => {
      if (users) {
        this.users = users;
      }
      else {
        this.users = [];
      }
    });

    this.cols = [
      { field: 'EmployeeId', header: 'Id' },
      { field: 'Name', header: 'User Name' },
      { field: 'EmailId', header: 'Email Id' },
      { field: 'IsActive', header: 'Active/InActive' }
    ];
  }

  /**
   * on row selecting user detail shown in dialog box.
   * @param event specufy the event.
   */
  onRowSelect(event) {
    this.user = this.cloneItem(event.data);
    this.isNewUser = false;
    this.displayDialog = true;
  }

  /**
   * clone the user object without changing the users array.
   * @param user specify the user.
   */
  cloneItem(user: User): User {
    let ItemDetails = new User();
    for (let prop in user) {
      ItemDetails[prop] = user[prop];
    }
    return ItemDetails;
  }

  /**
   * showing the dialog box.
   */
  showDialogToAdd() {
    this.user = new User();
    this.isNewUser = true;
    this.displayDialog = true;
  }

  /**
   * Save, Delete or Add functionality based on the user action type.
   * @param type specify the type of the action.
   */
  SaveOrDelete(type: string) {
    if (this.user && this.user.Id != null && this.user.EmailId !== null) {
      let index = this.users.findIndex(x => x.Id == this.user.Id && x.EmailId == this.user.EmailId);
      switch (type) {
        case "add":
          this.users.push(this.user);
          break;
        case "save":
          if (index > -1)
            this.users[index] = this.user;
          break;
        case "delete":
          if (index > -1)
            this.users.splice(index, 1);
          break;
      }
      this.user = new User();
      this.displayDialog = false;
    }
  }
}
