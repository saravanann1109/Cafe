import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainWorkspaceComponent } from '../app/main-workspace/main-workspace.component';
import { CartComponent } from '../app/cart/cart.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { ManageMenusComponent } from './manage-menus/manage-menus.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { IsAuthenticateUser, IsAuthorizedUser } from './service/auth.gaurd';
import { OrdersComponent } from './orders/orders.component';
const appRoutes: Routes = [
    {
        path: '', component: LayoutComponent, canActivate: [IsAuthenticateUser], children: [
            {
                path: "", component: MainWorkspaceComponent
            },
            {
                path: 'cart', component: CartComponent
            },
            {
                path: 'manage-users', component: ManageusersComponent
            },
            {
                path: 'manage-menus', component: ManageMenusComponent
            },
            {
                path: 'manage-orders', component: OrdersComponent
            }
        ]
    },
    {
        path: 'login', component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
