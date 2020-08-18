import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { InventoryService } from '../../common/services/inventory.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit {
  public inventoryItems: FormArray;
  public inventoryForm: FormGroup;

  constructor(
    private inventory: FormBuilder,
    private inventoryService: InventoryService,
    private toastr: ToastrService
  ) {
    this.inventoryForm = this.inventory.group({
      inventoryItems: this.inventory.array([this.createInventory()])
    });
  }

  // Create a place holder for inventory item to be entered
  createInventory(): FormGroup {
    return this.inventory.group({
      name: '',
      quantity: ''
    });
  }

  // Add new inventory item to the list
  addInventory(): void {
    this.inventoryItems = this.inventoryForm.get('inventoryItems') as FormArray;
    this.inventoryItems.push(this.createInventory());
  }

  // Get controls of all inventory items in the list
  get itemControls() {
    return (this.inventoryForm.get('inventoryItems') as FormArray).controls;
  }

  // Remove inventory item from the list
  removeInventory(index: number): void {
    this.inventoryItems = this.inventoryForm.get('inventoryItems') as FormArray;
    this.inventoryItems.removeAt(index);
  }

  // Handle inventory submission
  handleSubmit() {
    const items = { items: this.inventoryForm.value.inventoryItems };
    this.inventoryService.addInventories(items).subscribe((res) => {
      this.inventoryForm = this.inventory.group({
        inventoryItems: this.inventory.array([this.createInventory()])
      });
      this.toastr.success('Inventories added succesfully');
    });
  }

  ngOnInit() {}
}
