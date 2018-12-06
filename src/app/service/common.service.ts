import { Injectable, EventEmitter } from '@angular/core';
import { ReturnStatement } from '@angular/compiler';

@Injectable()
export class CommonService {
    public isAuthorized: boolean = false;
    public role: string;

    isAuthenticateUser(username: string, password: string): boolean {
        if (username === "admin" && password === "admin") {
            window.localStorage.setItem("isAuthenticateUser", "true");
            window.localStorage.setItem("role", "admin");
            this.isAuthorized = true;
            this.role = "admin";
            return true;
        }
        else if (username === "user" && password === "password") {
            window.localStorage.setItem("isAuthenticateUser", "true");
            window.localStorage.setItem("role", "user");
            this.isAuthorized = true;
            this.role = "user";
            return true;
        }
        else {
            return false;
        }
    }

    isUserLoggedIn() {
        let userValid = window.localStorage.getItem("isAuthenticateUser");
        if (userValid === "true") {
            this.isAuthorized = true;
            return true;
        }
        else
            return false;
    }

    isAdminUser() {
        if (this.role) {
            if (this.role === "admin") {
                return true;
            }
            else {
                return false;
            }
        }
        else
        {
            return false;
        }
    }
} 