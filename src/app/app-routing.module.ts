import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddInventoryComponent } from './pages/add-inventory/add-inventory.component';
import { ConsumeComponent } from './pages/consume/consume.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'create',
    component: AddInventoryComponent
  },
  {
    path: 'consume',
    component: ConsumeComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
