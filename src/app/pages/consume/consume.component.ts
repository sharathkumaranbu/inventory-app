import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { Inventory } from '../../common/models/inventory';
import { InventoryService } from '../../common/services/inventory.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consume',
  templateUrl: './consume.component.html',
  styleUrls: ['./consume.component.scss']
})
export class ConsumeComponent implements OnInit {
  showDropdown: boolean;
  selectedItem: string;
  inventories: Inventory[] = null;
  public inventoryItems: FormArray;
  public inventoryForm: FormGroup;

  constructor(
    private inventoryService: InventoryService,
    private inventory: FormBuilder,
    private toastr: ToastrService
  ) {
    this.showDropdown = false;
    this.inventoryForm = this.inventory.group({
      inventoryItems: this.inventory.array([])
    });
    this.selectedItem = 'Select Inventories';
  }

  // Toggle drop down visibility
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  // Hide drop down
  closeDropdown() {
    this.showDropdown = false;
  }

  ngOnInit() {
    this.getInventoryList();
  }

  // Get list of inventory items from API
  getInventoryList() {
    return this.inventoryService.getInventoryList().subscribe((inventories) => {
      this.inventories = inventories;
    });
  }

  // Create inventory entry
  createInventory(item): FormGroup {
    return this.inventory.group({
      name: item.name,
      quantity: item.quantity,
      selectedQuantity: 1
    });
  }

  get itemControls() {
    return (this.inventoryForm.get('inventoryItems') as FormArray).controls;
  }

  // Select inventory item from the list
  select(item) {
    this.inventories = this.inventories.filter((it) => it.name !== item.name);
    this.inventoryItems = this.inventoryForm.get('inventoryItems') as FormArray;
    this.inventoryItems.push(this.createInventory(item));
  }

  // Remove inventory item from the list
  removeInventory(index: number, name?: string): void {
    this.inventories.push(this.inventoryItems.value.find((item) => item.name === name));
    this.inventoryItems.removeAt(index);
  }

  // Handle consumption request
  handleConsume() {
    const items = {
      items: this.inventoryForm.value.inventoryItems.map((it) => ({
        name: it.name,
        quantity: parseInt(it.selectedQuantity, 10)
      }))
    };
    this.inventoryService.consumeInventories(items).subscribe((res) => {
      this.inventoryForm = this.inventory.group({
        inventoryItems: this.inventory.array([])
      });
      this.toastr.success('Consumed Inventories succesfully');
    });
  }

  numbers(value) {
    return Array.from(new Array(parseInt(value, 10)));
  }
}
