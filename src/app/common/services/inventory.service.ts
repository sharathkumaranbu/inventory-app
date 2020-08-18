import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { BaseHttpService } from './base-http.service';
import { Inventory } from '../models/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private http: BaseHttpService) {}

  /**
   * GET inventories
   */
  public getInventoryList(): Observable<Inventory[]> {
    return this.http.get(`inventories`);
  }

  /**
   * DELETE inventories
   * @param items List of items to be deleted
   */
  public deleteInventories(inventories: any): Observable<Inventory[]> {
    return this.http.delete('inventories', {
      // @ts-ignore
      body: inventories
    });
  }

  /**
   * Create Inventories
   * @param inventories List of item to be created
   */
  public addInventories(inventories: any): Observable<Inventory[]> {
    return this.http.post('inventories', inventories);
  }

  /**
   * Consume Inventories
   * @param inventories List of items to be consumed
   */
  public consumeInventories(inventories: any): Observable<Inventory[]> {
    return this.http.post('consume', inventories);
  }

  /**
   * Update inventories
   * @param items List of items to be updated
   */
  public updateInventories(items: any): Observable<Inventory[]> {
    return this.http.patch('inventories', items);
  }
}
