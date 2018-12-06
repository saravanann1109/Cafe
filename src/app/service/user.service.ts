import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
    configUrl = 'assets/json/users.json';
    constructor(private http: HttpClient) {
    }

    /**
     * get Items from the API.
     */
    getItems() {
        return this.http.get(this.configUrl);
    }
}