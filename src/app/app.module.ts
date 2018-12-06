import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { FormsModule } from '@angular/forms';
import {MenuModule} from 'primeng/menu';
import { SlideMenuModule } from 'primeng/slidemenu';
import { AppRoutingModule } from '../app/app-routing.module';
import {SplitButtonModule} from 'primeng/splitbutton';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import {TabViewModule} from 'primeng/tabview';
import {TooltipModule} from 'primeng/tooltip';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MainWorkspaceComponent } from './main-workspace/main-workspace.component';
import { ItemService } from './service/item.service';
import { CartComponent } from './cart/cart.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { UserService } from './service/user.service';
import { ManageMenusComponent } from './manage-menus/manage-menus.component';
import { AdministrationService } from './service/administration.service';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { CommonService } from './service/common.service';
import { IsAuthenticateUser, IsAuthorizedUser } from './service/auth.gaurd';
import { OrdersComponent } from './orders/orders.component';
import { OrderService } from './service/manage-orders.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    MainWorkspaceComponent,
    CartComponent,
    ManageusersComponent,
    ManageMenusComponent,
    LoginComponent,
    LayoutComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    SidebarModule,
    TooltipModule,
    MenuModule,
    InputTextModule,
    BrowserAnimationsModule,
    ButtonModule,
    TabViewModule,
    CheckboxModule,
    PasswordModule,
    SplitButtonModule,
    OverlayPanelModule,
    CardModule,
    TableModule,
    SlideMenuModule,
    FormsModule,
    DialogModule,
    ToastModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CommonService, MessageService, ItemService, UserService, AdministrationService, IsAuthenticateUser, OrderService,IsAuthorizedUser],
  bootstrap: [AppComponent]
})
export class AppModule { }
