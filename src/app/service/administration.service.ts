import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemMaster } from '../model/item-master';

@Injectable()
export class AdministrationService {
    configUrl = 'http://localhost:3000/menu';
    constructor(private http: HttpClient) {
    }

    /**
     * get Items from the API.
     */
    getItems() {
        return this.http.get(this.configUrl);
    }

    addItem(item: ItemMaster) {
        return this.http.post(this.configUrl, item);
    }

    saveItem(item: ItemMaster) {
        return this.http.put(this.configUrl + '/' + item.Id, item)
    }

    deleteItem(id:string)
    {
        return this.http.delete(this.configUrl + '/' + id);
    }
} 