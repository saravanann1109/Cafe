import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { reserveSlots } from '@angular/core/src/render3/instructions';
import { Role } from '../model/role';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManageusersComponent implements OnInit {
  public users: User[] = [];
  cols: any[];
  roles : Role[];
  isNewUser: boolean;
  selectedItem: User;
  user: User;
  displayDialog: boolean;
  constructor(private commonService:CommonService, private userService: UserService) { }

  ngOnInit() {
    this.displayDialog = false;
    this.isNewUser = true;
    // this.user = new User();
    this.userService.getUsers().subscribe((users: User[]) => {
      if (users) {
        this.users = users;
      }
      else {
        this.users = [];
      }
    });

    this.roles = [
      {Name: 'Admin', Code: 'A'},
      {Name: 'Chef', Code: 'C'},
      {Name: 'Customer', Code: 'CU'},
      {Name: 'SuperAdmin', Code: 'SA'}
    ]

    this.cols = [
      { field: 'Id', header: 'User Id' },
      { field: 'EmployeeId', header: 'Id' },
      { field: 'UserName', header: 'UserName' },
      { field: 'Name', header: 'Name' },
      { field: 'Role', header: 'Role' },
      //{ field: 'EmailId', header: 'Email Id' },
      { field: 'Department', header: 'Department' },
      { field: 'IsActive', header: 'Active/InActive' }
    ];
  }

  /**
   * on row selecting user detail shown in dialog box.
   * @param event specufy the event.
   */
  onRowSelect(event) {
    this.user = this.users.find(x=>x.Id === event.data.Id);
    // this.user = this.cloneItem(event.data);
    let index = this.roles.findIndex(x=>x.Name === event.data.Role);
    if(index > -1){
      this.user.Role = this.roles[index]; 
    }
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
    if (this.user && (this.user.UserName !== null && this.user.UserName !== undefined)) {
      let index = this.users.findIndex(x => x.Id == this.user.Id && x.EmailId == this.user.EmailId);
      switch (type) {
        case "add":
        this.user.CreatedBy = (this.commonService.getUser() !== null) ? this.commonService.getUser().UserName : null;
          this.userService.addUser(this.user).subscribe((response: User) => {
            this.user = response;
            this.users.push(this.user);
            this.commonService.emitMessage('success',this.user.Name +' '+ 'is Added!!!',this.user.Name +' '+ 'is added successfully');
          });
          break;
        case "save":
          if (index > -1)
          this.user.ModifiedBy = (this.commonService.getUser() !== null) ? this.commonService.getUser().UserName : null;
            this.userService.saveUser(this.user).subscribe((response: User) => {
              this.users[index] = response;
              this.commonService.emitMessage('success',this.user.Name +' '+ 'is Updated!!!',this.user.Name +' '+ 'is updated successfully');
            });
          break;
        case "delete":
          if (index > -1)
            var user = this.users[index];
          if (user) {
            this.userService.deleteUser(user.Id).subscribe((response: any) => {
              this.users.splice(index, 1);
              this.commonService.emitMessage('success',this.user.Name +' '+ 'is Deleted!!!',this.user.Name +' '+ 'is deleted successfully');
            })
          }
          break;
      }
      // this.user = new User();
      this.displayDialog = false;
    }
  }

  getButtonAction(user: any) {
    let result: boolean = false;


  }
}
