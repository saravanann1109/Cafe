import { CanActivate, Router } from "@angular/router";
import { CommonService } from "./common.service";
import { Injectable } from '@angular/core';
@Injectable()
export class IsAuthenticateUser implements CanActivate {
    
    constructor(private commonService: CommonService,private router:Router) {

    }
    canActivate() {
        let isValidUser = this.commonService.isUserLoggedIn();
        if (isValidUser === true) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}

@Injectable()
export class IsAuthorizedUser implements CanActivate {
    
    constructor(private commonService: CommonService,private router:Router) {

    }
    canActivate() {
        let isAdminUser = this.commonService.isAdminUser();
        if (isAdminUser === true) {
            return true;
        }
        else {
             this.router.navigate(['/']);
            return false;
        }
    }
}