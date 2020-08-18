import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Inventory } from '../../common/models/inventory';
import { InventoryService } from '../../common/services/inventory.service';
import _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  inventories: Inventory[] = null;
  selectedItems: any[] = [];
  updateClicked = false;
  deleteClicked = false;

  constructor(private inventoryService: InventoryService, private toastr: ToastrService) {}

  ngOnInit() {
    this.getInventoryList();
  }

  // Get the list of inventory items from API
  getInventoryList() {
    return this.inventoryService.getInventoryList().subscribe((inventories) => {
      this.inventories = inventories;
    });
  }

  // Trigger Update items modal to open
  updateItems() {
    this.updateClicked = true;
  }

  // Trigger Delete items modal to open
  deleteItems() {
    this.deleteClicked = true;
  }

  // If the modal is closed, reset the values to hide the modals
  onModalClose() {
    this.updateClicked = false;
    this.deleteClicked = false;
  }

  // Handle inventory update
  onUpdate() {
    this.inventoryService
      .updateInventories({ items: this.selectedItems.map((item) => _.omit(item, ['id'])) })
      .subscribe((res) => {
        this.getInventoryList();
        this.updateClicked = false;
        this.selectedItems = [];
        this.toastr.success('Inventories updated succesfully');
      });
  }

  // Handle inventory delete
  onDelete() {
    this.inventoryService
      .deleteInventories({
        items: this.selectedItems.map((item) => _.pick(item, ['name']))
      })
      .subscribe((res) => {
        this.getInventoryList();
        this.deleteClicked = false;
        this.selectedItems = [];
        this.toastr.success('Inventories deleted succesfully');
      });
  }

  // Update quantity of the selected items
  updateSelectedItems(item, event) {
    this.selectedItems = this.selectedItems.map((it) => {
      const target = it;
      if (it.id === item.id) {
        if (event.target.type === 'text') {
          target.name = event.target.value;
        } else {
          target.quantity = parseInt(event.target.value, 10);
        }
      }
      return target;
    });
  }

  // Select items in the table and add to the selected items list
  selectItems(event) {
    const name = event.target.name;
    const selected = this.inventories.find((item) => item.name === name);
    if (event.target.checked) {
      this.selectedItems.push({
        id: selected.id,
        name,
        quantity: selected.quantity
      });
    } else {
      this.selectedItems = this.selectedItems.filter((item) => item.name !== name);
    }
  }
}
