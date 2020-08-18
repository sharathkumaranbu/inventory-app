import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  itemsList = [
    {
      name: 'Inventories',
      link: '/home',
      image: 'assets/inventory.svg'
    },
    {
      name: 'Add Inventory',
      link: '/create',
      image: 'assets/plus.svg'
    },
    {
      name: 'Consume Inventory',
      link: '/consume',
      image: 'assets/cost.svg'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
