import { Component, OnInit } from '@angular/core';
import { ItemService } from '../service/item.service';
import { MenuItem } from 'primeng/api';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public count: number = 0;
  public display: boolean = false;
  public component: string = "";
  items: MenuItem[];
  isAdmin: boolean = false;
  isAuthenticated: boolean = false;
  constructor(private commonService: CommonService, private itemService: ItemService) { }
  public menu: string[] = ["Login", "Contact Us"];
  public menuMain: string[] = ["My Orders", "Manage Items", "Mange ORders", "Log Out"];
  ngOnInit() {

    this.commonService.eventEmit.subscribe((res) => {
      this.isAuthenticated = this.commonService.isAuthorized;
      this.isAdmin = (this.commonService.getUser()) !== null ? this.commonService.getUser().Role === "Admin" ? true : false : false;
      this.items = [
        {
          label: 'Login',
          icon: 'pi pi-sign-in',
          routerLink: '/login',
          visible: !this.isAuthenticated,
          command: () => {
            this.display = false;
          }
        },
        {
          label: 'Manage Orders',
          icon: 'fa fa-clipboard-list',
          visible: this.isAuthenticated && this.isAdmin,
          routerLink: '/manage-orders',
          command: () => {
            this.display = false;
          }
        },
        {
          label: 'Manage Menu',
          icon: 'fas fa-list-alt',
          visible: this.isAuthenticated && this.isAdmin,
          routerLink: '/manage-menus',
          command: () => {
            this.display = false;
          }
        },
        {
          label: 'Manage Users',
          icon: 'pi pi-users',
          visible: this.isAuthenticated && this.isAdmin,
          routerLink: '/manage-users',
          command: () => {
            this.display = false;
          }
        },
        {
          label: 'Sign-out',
          icon: 'pi pi-sign-out',
          visible: this.isAuthenticated,
          routerLink: '/login',
          command: () => {
            this.commonService.clearSession();
            this.display = false;
          }
        }
      ];
    });
    this.itemService.addItemListener.subscribe((counter: number) => {
      this.count = counter;
    });

    this.itemService.componentListener.subscribe((component: string) => {
      this.component = component;
    });

  }


  displayNav() {
    this.display = true;
  }

}
