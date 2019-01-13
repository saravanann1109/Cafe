import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable()
export class UserService {
    configUrl = 'http://localhost:3000/user';
    constructor(private http: HttpClient) {
    }

    /**
     * get Items from the API.
     */
    getUsers() {
        return this.http.get(this.configUrl);
    }

    addUser(user: User) {
        return this.http.post(this.configUrl, user);
    }

    saveUser(user: User) {
        return this.http.put(this.configUrl + '/' + user.Id, user);
    }

    editUser(user: User) {
        return this.http.put(this.configUrl, user);
    }

    deleteUser(id: string) {
        return this.http.delete(this.configUrl + '/' + id);
    }
}